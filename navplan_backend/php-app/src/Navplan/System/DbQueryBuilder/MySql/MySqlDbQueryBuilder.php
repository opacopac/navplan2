<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbSortOrder;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClause;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereClauseText;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereCombinator;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbWhereOpTxt;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbQueryBuilder;


class MySqlDbQueryBuilder implements IDbQueryBuilder
{
    private string $select;

    private ?DbWhereClause $where = null;

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


    public function whereClause(DbWhereClause $clause): IDbQueryBuilder
    {
        $this->where = $clause;

        return $this;
    }


    public function where(string $colName, DbWhereOp $op, string|int|float|bool|null $value): IDbQueryBuilder
    {
        return $this->whereClause(
            DbWhereClauseSimple::create($colName, $op, $value),
        );
    }


    public function whereEquals(string $colName, string|int|float|bool|null $value): IDbQueryBuilder
    {
        return $this->where($colName, DbWhereOp::EQ, $value);
    }


    public function whereText(string $colName, DbWhereOpTxt $op, string $value): IDbQueryBuilder
    {
        return $this->whereClause(
            DbWhereClauseText::create($colName, $op, $value)
        );
    }


    public function wherePrefixLike(string $colName, string $value): IDbQueryBuilder
    {
        return $this->whereText($colName, DbWhereOpTxt::LIKE_PREFIX, $value);
    }


    public function whereGeo(string $colName, DbWhereOpGeo $op, Position2d|Extent2d|Line2d|Ring2d $value): IDbQueryBuilder
    {
        return $this->whereClause(
            DbWhereClauseGeo::create($colName, $op, $value)
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

        $multiClause = DbWhereClauseMulti::create(
            DbWhereCombinator::AND,
            ...array_map(function ($clause) {
                return DbWhereClauseSimple::create($clause[0], $clause[1], $clause[2]);
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

        $multiClause = DbWhereClauseMulti::create(
            DbWhereCombinator::OR,
            ...array_map(function ($clause) {
                return DbWhereClauseSimple::create($clause[0], $clause[1], $clause[2]);
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
