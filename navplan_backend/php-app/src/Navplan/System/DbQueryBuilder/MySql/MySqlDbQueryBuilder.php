<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCol;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCond;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondCombinator;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpTxt;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondText;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\Domain\Model\DbTable;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbQueryBuilder;


class MySqlDbQueryBuilder implements IDbQueryBuilder
{
    private string $select;

    private ?DbCond $where = null;

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


    public function selectAllFrom(DbTable|string $table): IDbQueryBuilder
    {
        $allColName = $this->buildAllColName($table);

        $this->select = "SELECT " . $allColName . " FROM " . $this->buildTableName($table);

        return $this;
    }


    public function selectFrom(DbTable|string $table, DbCol|string ...$columns): IDbQueryBuilder
    {
        if (count($columns) === 0) {
            throw new InvalidArgumentException("At least one column name is required");
        }

        $colNames = [];
        foreach ($columns as $col) {
            $colNames[] = $this->buildColName($col);
        }

        $colList = implode(", ", $colNames);
        $this->select = "SELECT " . $colList . " FROM " . $this->buildTableName($table);

        return $this;
    }


    public function whereCondition(DbCond $cond): IDbQueryBuilder
    {
        $this->where = $cond;

        return $this;
    }


    public function where(DbCol|string $column, DbCondOp $op, string|int|float|bool|null $value): IDbQueryBuilder
    {
        $colName = $this->buildColName($column);

        return $this->whereCondition(
            DbCondSimple::create($colName, $op, $value),
        );
    }


    public function whereEquals(DbCol|string $column, string|int|float|bool|null $value): IDbQueryBuilder
    {
        return $this->where($column, DbCondOp::EQ, $value);
    }


    public function whereText(DbCol|string $column, DbCondOpTxt $op, string $value): IDbQueryBuilder
    {
        $colName = $this->buildColName($column);

        return $this->whereCondition(
            DbCondText::create($colName, $op, $value)
        );
    }


    public function wherePrefixLike(DbCol|string $column, string $value): IDbQueryBuilder
    {
        return $this->whereText($column, DbCondOpTxt::LIKE_PREFIX, $value);
    }


    public function whereGeo(DbCol|string $column, DbCondOpGeo $op, Position2d|Extent2d|Line2d|Ring2d $value): IDbQueryBuilder
    {
        $colName = $this->buildColName($column);

        return $this->whereCondition(
            DbCondGeo::create($colName, $op, $value)
        );
    }


    public function whereAll(DbCond ...$conditions): IDbQueryBuilder
    {
        $multiCond = DbCondMulti::create(DbCondCombinator::AND, ...$conditions);
        $this->whereCondition($multiCond);

        return $this;
    }


    public function whereAny(DbCond ...$conditions): IDbQueryBuilder
    {
        $multiCond = DbCondMulti::create(DbCondCombinator::OR, ...$conditions);
        $this->whereCondition($multiCond);

        return $this;
    }


    public function whereInMaxDist(DbCol|string $latColumn, DbCol|string $lonColumn, Position2d $pos, float $maxDistDeg): IDbQueryBuilder
    {
        $latColName = $this->buildColName($latColumn);
        $lonColName = $this->buildColName($lonColumn);

        $this->whereAll(
            DbCondSimple::create($latColName, DbCondOp::GT, $pos->latitude - $maxDistDeg),
            DbCondSimple::create($latColName, DbCondOp::LT, $pos->latitude + $maxDistDeg),
            DbCondSimple::create($lonColName, DbCondOp::GT, $pos->longitude - $maxDistDeg),
            DbCondSimple::create($lonColName, DbCondOp::LT, $pos->longitude + $maxDistDeg)
        );

        return $this;
    }


    public function orderBy(DbCol|string $column, DbSortOrder $direction): IDbQueryBuilder
    {
        $colName = $this->buildColName($column);

        $dirStr = $direction === DbSortOrder::ASC ? "ASC" : "DESC";
        $this->orderList[] = $colName . " " . $dirStr;

        return $this;
    }


    public function orderByLatLonDist(DbCol|string $latColumn, DbCol|string $lonColumn, Position2d $pos): IDbQueryBuilder
    {
        $latColName = $this->buildColName($latColumn);
        $lonColName = $this->buildColName($lonColumn);

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
            ? MySqlDbCondBuilder::create($this->dbService)->condition($this->where)->build()
            : "";
        $orderByStr = $this->buildOrderByString();
        $limitStr = $this->buildLimitString();

        return $selectStr
            . ($whereStr !== "" ? " WHERE " . $whereStr : "")
            . ($orderByStr !== "" ? " ORDER BY " . $orderByStr : "")
            . ($limitStr !== "" ? " " . $limitStr : "");
    }


    private function buildTableName(DbTable|string $table): string
    {
        match (true) {
            $table instanceof DbTable => $tableName = $table->getName() . ($table->getAlias() ? " AS " . $table->getAlias() : ""),
            is_string($table) => $tableName = $table,
            default => throw new InvalidArgumentException("Unsupported table type")
        };

        return $tableName;
    }


    private function buildAllColName(DbTable|string $table): string
    {
        return MySqlDbColBuilder::buildAllColName($table);
    }


    private function buildColName(DbCol|string $col): string
    {
        return MySqlDbColBuilder::buildColName($col);
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
