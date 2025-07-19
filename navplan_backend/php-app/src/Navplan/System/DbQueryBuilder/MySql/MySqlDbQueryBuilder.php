<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhere;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereCombinator;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpTxt;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereText;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbQueryBuilder;


class MySqlDbQueryBuilder implements IDbQueryBuilder
{
    private string $select;

    private ?DbWhere $where = null;

    /** @var string[] $orderList */
    private array $orderList = [];

    private int $limit = 0;


    private function __construct(private readonly IDbService $dbService)
    {
    }


    public static function create(IDbService $dbService): MySqlDbQueryBuilder
    {
        return new MySqlDbQueryBuilder($dbService);
    }


    public function selectAllFrom(string $tableName): IDbQueryBuilder
    {
        $this->select = "SELECT * FROM " . $tableName;

        return $this;
    }


    public function selectFrom(string $tableName, string ...$colNames): IDbQueryBuilder
    {
        if (count($colNames) === 0) {
            throw new InvalidArgumentException("At least one column name is required");
        }

        $colList = implode(", ", $colNames);
        $this->select = "SELECT " . $colList . " FROM " . $tableName;

        return $this;
    }


    public function whereClause(DbWhere $clause): IDbQueryBuilder
    {
        $this->where = $clause;

        return $this;
    }


    public function where(string $colName, DbWhereOp $op, string|int|float|bool|null $value): IDbQueryBuilder
    {
        return $this->whereClause(
            DbWhereSimple::create($colName, $op, $value),
        );
    }


    public function whereEquals(string $colName, string|int|float|bool|null $value): IDbQueryBuilder
    {
        return $this->where($colName, DbWhereOp::EQ, $value);
    }


    public function whereText(string $colName, DbWhereOpTxt $op, string $value): IDbQueryBuilder
    {
        return $this->whereClause(
            DbWhereText::create($colName, $op, $value)
        );
    }


    public function wherePrefixLike(string $colName, string $value): IDbQueryBuilder
    {
        return $this->whereText($colName, DbWhereOpTxt::LIKE_PREFIX, $value);
    }


    public function whereGeo(string $colName, DbWhereOpGeo $op, Position2d|Extent2d|Line2d|Ring2d $value): IDbQueryBuilder
    {
        return $this->whereClause(
            DbWhereGeo::create($colName, $op, $value)
        );
    }


    public function whereAll(DbWhere ...$clauses): IDbQueryBuilder
    {
        if (count($clauses) === 0) {
            throw new InvalidArgumentException("At least one where clause is required");
        }

        $multiClause = DbWhereMulti::create(DbWhereCombinator::AND, ...$clauses);
        $this->whereClause($multiClause);

        return $this;
    }


    public function whereAny(DbWhere ...$clauses): IDbQueryBuilder
    {
        if (count($clauses) === 0) {
            throw new InvalidArgumentException("At least one where clause is required");
        }

        $multiClause = DbWhereMulti::create(DbWhereCombinator::OR, ...$clauses);
        $this->whereClause($multiClause);

        return $this;
    }


    public function whereInMaxDist(string $latColName, string $lonColName, Position2d $pos, float $maxDistDeg): IDbQueryBuilder
    {
        $this->whereAll(
            DbWhereSimple::create($latColName, DbWhereOp::GT, $pos->latitude - $maxDistDeg),
            DbWhereSimple::create($latColName, DbWhereOp::LT, $pos->latitude + $maxDistDeg),
            DbWhereSimple::create($lonColName, DbWhereOp::GT, $pos->longitude - $maxDistDeg),
            DbWhereSimple::create($lonColName, DbWhereOp::LT, $pos->longitude + $maxDistDeg)
        );

        return $this;
    }


    public function orderBy(string $colName, DbSortOrder $direction): IDbQueryBuilder
    {
        $dirStr = $direction === DbSortOrder::ASC ? "ASC" : "DESC";
        $this->orderList[] = $colName . " " . $dirStr;

        return $this;
    }


    public function orderByLatLonDist(string $latColName, string $lonColName, Position2d $pos): IDbQueryBuilder
    {
        $pseudoColName = "((" . $latColName . " - " . $pos->latitude . ")"
            . " * (" . $latColName . " - " . $pos->latitude . ")"
            . " + (" . $lonColName . " - " . $pos->longitude . ")"
            . " * (" . $lonColName . " - " . $pos->longitude . "))";

        $this->orderBy($pseudoColName, DbSortOrder::ASC);

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
        $whereStr = $this->where !== null
            ? MySqlDbWhereClauseBuilder::create($this->dbService)->clause($this->where)->build()
            : "";
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
