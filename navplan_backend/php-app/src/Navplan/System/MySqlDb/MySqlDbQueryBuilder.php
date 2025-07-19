<?php declare(strict_types=1);

namespace Navplan\System\MySqlDb;

use InvalidArgumentException;
use Navplan\System\Domain\Model\DbSortOrder;
use Navplan\System\Domain\Model\DbWhereClause;
use Navplan\System\Domain\Model\DbWhereClauseFactory;
use Navplan\System\Domain\Model\DbWhereCombinator;
use Navplan\System\Domain\Model\DbWhereMultiClause;
use Navplan\System\Domain\Model\DbWhereOp;
use Navplan\System\Domain\Model\DbWhereSingleClause;
use Navplan\System\Domain\Service\IDbQueryBuilder;
use Navplan\System\Domain\Service\IDbService;


class MySqlDbQueryBuilder implements IDbQueryBuilder
{
    private DbWhereClauseFactory $w;
    private string $select;

    private ?DbWhereClause $where = null;

    /** @var string[] $orderList */
    private array $orderList = [];

    private int $limit = 0;


    public function __construct(private readonly IDbService $dbService)
    {
        $this->w = new DbWhereClauseFactory($dbService);
    }


    public function selectAllFrom(string $tableName): IDbQueryBuilder
    {
        $this->select = "SELECT * FROM " . $tableName;

        return $this;
    }


    public function whereClause(DbWhereClause $clause): IDbQueryBuilder
    {
        $this->where = $clause;

        return $this;
    }


    public function where(string $colName, DbWhereOp $op, string|int|float|bool|null $value): IDbQueryBuilder
    {
        return $this->whereClause($this->w->single($colName, $op, $value));
    }


    public function whereEquals(string $colName, string|int|float|bool|null $value): IDbQueryBuilder
    {
        return $this->where($colName, DbWhereOp::EQ, $value);
    }


    public function wherePrefixLike(string $colName, string $value): IDbQueryBuilder
    {
        return $this->where($colName, DbWhereOp::LIKE_PREFIX, $value);
    }


    /**
     * @param $clauses [string, DbWhereOp, string|int|float|bool|null]
     * @return IDbQueryBuilder
     */
    public function whereAll(array $clauses): IDbQueryBuilder
    {
        if (count($clauses) === 0) {
            throw new InvalidArgumentException("At least one where clause is required");
        }

        $multiClause = new DbWhereMultiClause(
            DbWhereCombinator::AND,
            array_map(function ($clause) {
                return new DbWhereSingleClause($clause[0], $clause[1], $clause[2]);
            }, $clauses)
        );

        $this->whereClause($multiClause);

        return $this;
    }


    /**
     * @param $clauses [string, DbWhereOp, string|int|float|bool|null]
     * @return IDbQueryBuilder
     */
    public function whereAny(array $clauses): IDbQueryBuilder
    {
        if (count($clauses) === 0) {
            throw new InvalidArgumentException("At least one where clause is required");
        }

        $multiClause = new DbWhereMultiClause(
            DbWhereCombinator::OR,
            array_map(function ($clause) {
                return new DbWhereSingleClause($clause[0], $clause[1], $clause[2]);
            }, $clauses)
        );

        $this->whereClause($multiClause);

        return $this;
    }


    public function orderBy(string $colName, DbSortOrder $direction): IDbQueryBuilder
    {
        $dirStr = $direction === DbSortOrder::ASC ? "ASC" : "DESC";
        $this->orderList[] = $colName . " " . $dirStr;

        return $this;
    }


    public function limit(int $limit): IDbQueryBuilder
    {
        if ($limit <= 0) {
            throw new InvalidArgumentException("Limit must be greater than 0");
        }

        $this->limit = $limit;

        return $this;
    }


    public function build(): string
    {
        $selectStr = $this->buildSelectString();
        $whereStr = $this->buildWhereClauseString($this->where);
        $orderByStr = $this->buildOrderByString();
        $limitStr = $this->buildLimitString();

        return $selectStr
            . ($whereStr !== "" ? " WHERE " . $whereStr : "")
            . ($orderByStr !== "" ? " ORDER BY " . $orderByStr : "")
            . ($limitStr !== "" ? " " . $limitStr : "");
    }


    private function buildSelectString(): string
    {
        return $this->select;
    }


    private function buildWhereClauseString(?DbWhereClause $clause): string
    {
        if ($clause === null) {
            return "";
        }

        return match (get_class($clause)) {
            DbWhereSingleClause::class => $this->buildWhereSingleClauseString($clause),
            DbWhereMultiClause::class => $this->buildWhereMultiClauseString($clause),
            default => throw new InvalidArgumentException("Unsupported where clause type"),
        };
    }


    private function buildWhereSingleClauseString(DbWhereSingleClause $clause): string
    {
        // handle NULL values separately
        if ($clause->value === NULL) {
            if ($clause->operator === DbWhereOp::EQ) {
                return $clause->colName . " IS NULL";
            } else {
                return $clause->colName . " IS NOT NULL";
            }
        }

        $opStr = match ($clause->operator) {
            DbWhereOp::EQ => "=",
            DbWhereOp::NE => "!=",
            DbWhereOp::GT => ">",
            DbWhereOp::GT_OR_E => ">=",
            DbWhereOp::LT => "<",
            DbWhereOp::LT_OR_E => "<=",
            DbWhereOp::LIKE_PREFIX => "LIKE",
            DbWhereOp::LIKE_SUFFIX => "LIKE",
            DbWhereOp::LIKE_SUBSTR => "LIKE",
        };

        $preValue = match ($clause->operator) {
            DbWhereOp::LIKE_PREFIX => $clause->value . "%",
            DbWhereOp::LIKE_SUFFIX => "%" . $clause->value,
            DbWhereOp::LIKE_SUBSTR => "%" . $clause->value . "%",
            default => $clause->value
        };

        if (is_string($preValue)) {
            $valStr = DbHelper::getDbStringValue($this->dbService, $preValue);
        } else if (is_bool($preValue)) {
            $valStr = DbHelper::getDbBoolValue($preValue);
        } else if (is_int($preValue)) {
            $valStr = DbHelper::getDbIntValue($preValue);
        } else if (is_float($preValue)) {
            $valStr = DbHelper::getDbFloatValue($preValue);
        } else {
            throw new InvalidArgumentException("Unsupported value type for where clause");
        }

        return $clause->colName . " " . $opStr . " " . $valStr;
    }


    private function buildWhereMultiClauseString(DbWhereMultiClause $clause): string
    {
        $clauseStrs = array_map(function ($subClause) {
            return $this->buildWhereClauseString($subClause);
        }, $clause->clauses);

        $combinatorStr = match ($clause->combinator) {
            DbWhereCombinator::AND => "AND",
            DbWhereCombinator::OR => "OR"
        };

        return "(" . implode(" " . $combinatorStr . " ", $clauseStrs) . ")";
    }


    private function buildOrderByString(): string
    {
        if (count($this->orderList) === 0) {
            return "";
        }

        return implode(", ", $this->orderList);
    }


    private function buildLimitString(): string
    {
        if ($this->limit <= 0) {
            return "";
        }

        return "LIMIT " . $this->limit;
    }
}
