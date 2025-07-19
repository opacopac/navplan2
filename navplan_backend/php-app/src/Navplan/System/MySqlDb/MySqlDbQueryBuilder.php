<?php declare(strict_types=1);

namespace Navplan\System\MySqlDb;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Domain\Model\DbSortOrder;
use Navplan\System\Domain\Model\DbWhereClause;
use Navplan\System\Domain\Model\DbWhereClauseGeo;
use Navplan\System\Domain\Model\DbWhereClauseMulti;
use Navplan\System\Domain\Model\DbWhereClauseSimple;
use Navplan\System\Domain\Model\DbWhereClauseText;
use Navplan\System\Domain\Model\DbWhereCombinator;
use Navplan\System\Domain\Model\DbWhereOp;
use Navplan\System\Domain\Model\DbWhereOpGeo;
use Navplan\System\Domain\Model\DbWhereOpTxt;
use Navplan\System\Domain\Service\IDbQueryBuilder;
use Navplan\System\Domain\Service\IDbService;


class MySqlDbQueryBuilder implements IDbQueryBuilder
{
    private string $select;

    private ?DbWhereClause $where = null;

    /** @var string[] $orderList */
    private array $orderList = [];

    private int $limit = 0;


    public function __construct(private readonly IDbService $dbService)
    {
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
        return $this->whereClause(
            new DbWhereClauseSimple($colName, $op, $value),
        );
    }


    public function whereEquals(string $colName, string|int|float|bool|null $value): IDbQueryBuilder
    {
        return $this->where($colName, DbWhereOp::EQ, $value);
    }


    public function whereText(string $colName, DbWhereOpTxt $op, string $value): IDbQueryBuilder
    {
        return $this->whereClause(
            new DbWhereClauseText($colName, $op, $value)
        );
    }


    public function wherePrefixLike(string $colName, string $value): IDbQueryBuilder
    {
        return $this->whereText($colName, DbWhereOpTxt::LIKE_PREFIX, $value);
    }


    public function whereGeo(string $colName, DbWhereOpGeo $op, Position2d|Extent2d|Line2d|Ring2d $value): IDbQueryBuilder
    {
        return $this->whereClause(
            new DbWhereClauseGeo($colName, $op, $value)
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

        $multiClause = new DbWhereClauseMulti(
            DbWhereCombinator::AND,
            array_map(function ($clause) {
                return new DbWhereClauseSimple($clause[0], $clause[1], $clause[2]);
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

        $multiClause = new DbWhereClauseMulti(
            DbWhereCombinator::OR,
            array_map(function ($clause) {
                return new DbWhereClauseSimple($clause[0], $clause[1], $clause[2]);
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
            DbWhereClauseSimple::class => $this->buildWhereSimpleClauseString($clause),
            DbWhereClauseText::class => $this->buildWhereClauseTextString($clause),
            DbWhereClauseMulti::class => $this->buildWhereMultiClauseString($clause),
            DbWhereClauseGeo::class => $this->buildWhereClauseGeoString($clause),
            default => throw new InvalidArgumentException("Unsupported where clause type"),
        };
    }


    private function buildWhereSimpleClauseString(DbWhereClauseSimple $clause): string
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
        };

        $valStr = $clause->value;
        $valStr = match (true) {
            is_string($valStr) => DbHelper::getDbStringValue($this->dbService, $valStr),
            is_bool($valStr) => DbHelper::getDbBoolValue($valStr),
            is_int($valStr) => DbHelper::getDbIntValue($valStr),
            is_float($valStr) => DbHelper::getDbFloatValue($valStr),
            default => throw new InvalidArgumentException("Unsupported value type for where clause"),
        };

        return $clause->colName . " " . $opStr . " " . $valStr;
    }


    private function buildWhereClauseTextString(DbWhereClauseText $clause): string
    {
        $opStr = "LIKE";

        $valStr = $clause->value;
        $valStr = match ($clause->operator) {
            DbWhereOpTxt::LIKE_PREFIX => $valStr . "%",
            DbWhereOpTxt::LIKE_SUFFIX => "%" . $valStr,
            DbWhereOpTxt::LIKE_SUBSTR => "%" . $valStr . "%",
        };
        $valStr = DbHelper::getDbStringValue($this->dbService, $valStr);

        return $clause->colName . " " . $opStr . " " . $valStr;
    }


    private function buildWhereClauseGeoString(DbWhereClauseGeo $clause): string
    {
        $opStr = match ($clause->operator) {
            DbWhereOpGeo::INTERSECTS_ST => "ST_Intersects",
            DbWhereOpGeo::INTERSECTS_MBR => "MBRIntersects",
        };

        $geoValueStr = match (true) {
            $clause->value instanceof Position2d => DbHelper::getDbPointStringFromPos($clause->value),
            $clause->value instanceof Extent2d => DbHelper::getDbExtentPolygon2($clause->value),
            $clause->value instanceof Line2d => DbHelper::getDbLineString($clause->value->position2dList),
            $clause->value instanceof Ring2d => DbHelper::getDbPolygonString($clause->value->toArray()),
            default => throw new InvalidArgumentException("Unsupported geometry type for where clause"),
        };

        return $opStr . "(" . $clause->colName . ", " . $geoValueStr . ")";
    }


    private function buildWhereMultiClauseString(DbWhereClauseMulti $clause): string
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
