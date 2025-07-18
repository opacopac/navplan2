<?php declare(strict_types=1);

namespace Navplan\System\MySqlDb;

use InvalidArgumentException;
use Navplan\System\Domain\Model\DbSortDirection;
use Navplan\System\Domain\Model\DbWhereClause;
use Navplan\System\Domain\Model\DbWhereCombinator;
use Navplan\System\Domain\Model\DbWhereDualClause;
use Navplan\System\Domain\Model\DbWhereMultiClause;
use Navplan\System\Domain\Model\DbWhereOp;
use Navplan\System\Domain\Model\DbWhereSingleClause;
use Navplan\System\Domain\Service\IDbQueryBuilder;
use Navplan\System\Domain\Service\IDbService;


class MySqlDbQueryBuilder implements IDbQueryBuilder
{
    private string $select;

    private ?DbWhereClause $where = null;

    /** @var string[] $orderList */
    private array $orderList = [];


    public function __construct(private readonly IDbService $dbService)
    {
    }


    public function selectAllFrom(string $tableName): IDbQueryBuilder
    {
        $this->select = "SELECT * FROM " . $tableName;

        return $this;
    }


    public function where(DbWhereClause $clause): IDbQueryBuilder
    {
        $this->where = $clause;

        return $this;
    }


    public function whereEquals(string $colName, string|int|float|bool|null $value): IDbQueryBuilder
    {
        return $this->where(
            new DbWhereSingleClause($colName, DbWhereOp::EQ, $value)
        );
    }


    public function whereNotEquals(string $colName, string|int|float|bool|null $value): IDbQueryBuilder
    {
        return $this->where(
            new DbWhereSingleClause($colName, DbWhereOp::NE, $value)
        );
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

        $this->where($multiClause);

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

        $this->where($multiClause);

        return $this;
    }


    public function orderBy(string $colName, DbSortDirection $direction): IDbQueryBuilder
    {
        $dirStr = $direction === DbSortDirection::ASC ? "ASC" : "DESC";
        $this->orderList[] = $colName . " " . $dirStr;

        return $this;
    }


    public function build(): string
    {
        $selectStr = $this->buildSelectString();
        $whereStr = $this->buildWhereClauseString($this->where);
        $orderByStr = $this->buildOrderByString();

        return $selectStr
            . ($whereStr !== "" ? " WHERE " . $whereStr : "")
            . ($orderByStr !== "" ? " ORDER BY " . $orderByStr : "");
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
            DbWhereDualClause::class => $this->buildWhereDualClauseString($clause),
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
            DbWhereOp::LT_OR_E => "<="
        };

        if (is_string($clause->value)) {
            $valStr = DbHelper::getDbStringValue($this->dbService, $clause->value);
        } else if (is_bool($clause->value)) {
            $valStr = DbHelper::getDbBoolValue($clause->value);
        } else if (is_int($clause->value)) {
            $valStr = DbHelper::getDbIntValue($clause->value);
        } else if (is_float($clause->value)) {
            $valStr = DbHelper::getDbFloatValue($clause->value);
        } else {
            throw new InvalidArgumentException("Unsupported value type for where clause");
        }

        return $clause->colName . " " . $opStr . " " . $valStr;
    }


    private function buildWhereDualClauseString(DbWhereDualClause $clause): string
    {
        $leftStr = $this->buildWhereClauseString($clause->clause1);
        $rightStr = $this->buildWhereClauseString($clause->clause2);
        $combinatorStr = match ($clause->combinator) {
            DbWhereCombinator::AND => "AND",
            DbWhereCombinator::OR => "OR"
        };

        return "(" . $leftStr . " " . $combinatorStr . " " . $rightStr . ")";
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
}
