<?php declare(strict_types=1);

namespace Navplan\System\MySqlDb;

use InvalidArgumentException;
use Navplan\System\Domain\Model\DbSortDirection;
use Navplan\System\Domain\Model\DbWhereClause;
use Navplan\System\Domain\Model\DbWhereCombinator;
use Navplan\System\Domain\Model\DbWhereDualClause;
use Navplan\System\Domain\Model\DbWhereOperator;
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


    public function whereEquals(string $colName, string|int|float|null $value): IDbQueryBuilder
    {
        return $this->where(
            new DbWhereSingleClause($colName, DbWhereOperator::EQ, $value)
        );
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
            default => throw new InvalidArgumentException("Unsupported where clause type"),
        };
    }


    private function buildWhereSingleClauseString(DbWhereSingleClause $clause): string
    {
        // handle NULL values separately
        if ($clause->value === NULL) {
            if ($clause->operator === DbWhereOperator::EQ) {
                return $clause->colName . " IS NULL";
            } else {
                return $clause->colName . " IS NOT NULL";
            }
        }

        $opStr = match ($clause->operator) {
            DbWhereOperator::EQ => "=",
            DbWhereOperator::NE => "!=",
            DbWhereOperator::GT => ">",
            DbWhereOperator::GT_OR_E => ">=",
            DbWhereOperator::LT => "<",
            DbWhereOperator::LT_OR_E => "<=",
            default => throw new InvalidArgumentException("Unsupported operator: " . $clause->operator->name)
        };

        $valStr = is_string($clause->value)
            ? "'" . $this->dbService->escapeString($clause->value) . "'"
            : $clause->value;

        return $clause->colName . " " . $opStr . " " . $valStr;
    }


    private function buildWhereDualClauseString(DbWhereDualClause $clause): string
    {
        $leftStr = $this->buildWhereClauseString($clause->clause1);
        $rightStr = $this->buildWhereClauseString($clause->clause2);
        $combinatorStr = match ($clause->combinator) {
            DbWhereCombinator::AND => "AND",
            DbWhereCombinator::OR => "OR",
            default => throw new InvalidArgumentException("Unsupported combinator: " . $clause->combinator->name)
        };

        return "(" . $leftStr . " " . $combinatorStr . " " . $rightStr . ")";
    }


    private function buildOrderByString(): string
    {
        if (count($this->orderList) === 0) {
            return "";
        }

        return implode(", ", $this->orderList);
    }
}
