<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\MySql;

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
use Navplan\System\DbQueryBuilder\Domain\Service\IDbQueryBuilder;
use Navplan\System\DbQueryBuilder\Domain\Service\IDbWhereClauseBuilder;


class MySqlDbWhereClauseBuilder implements IDbWhereClauseBuilder
{
    private ?DbCond $whereCondition = null;


    public function __construct(
        private readonly IDbService $dbService,
        private readonly MySqlDbQueryBuilder $queryBuilder
    )
    {
    }


    public function condition(DbCond $cond): IDbWhereClauseBuilder
    {
        $this->whereCondition = $cond;

        return $this;
    }


    public function op(DbCol|string $column, DbCondOp $op, string|int|float|bool|null $value): IDbWhereClauseBuilder
    {
        return $this->condition(
            DbCondSimple::create($column, $op, $value),
        );
    }


    public function equals(DbCol|string $column, string|int|float|bool|null $value): IDbWhereClauseBuilder
    {
        return $this->op($column, DbCondOp::EQ, $value);
    }


    public function text(DbCol|string $column, DbCondOpTxt $op, string $value): IDbWhereClauseBuilder
    {
        return $this->condition(
            DbCondText::create($column, $op, $value)
        );
    }


    public function prefixLike(DbCol|string $column, string $value): IDbWhereClauseBuilder
    {
        return $this->text($column, DbCondOpTxt::LIKE_PREFIX, $value);
    }


    public function geo(DbCol|string $column, DbCondOpGeo $op, Position2d|Extent2d|Line2d|Ring2d $value): IDbWhereClauseBuilder
    {
        return $this->condition(
            DbCondGeo::create($column, $op, $value)
        );
    }


    public function all(DbCond ...$conditions): IDbWhereClauseBuilder
    {
        $multiCond = DbCondMulti::create(DbCondCombinator::AND, ...$conditions);
        $this->condition($multiCond);

        return $this;
    }


    public function any(DbCond ...$conditions): IDbWhereClauseBuilder
    {
        $multiCond = DbCondMulti::create(DbCondCombinator::OR, ...$conditions);
        $this->condition($multiCond);

        return $this;
    }


    public function inMaxDist(DbCol|string $latColumn, DbCol|string $lonColumn, Position2d $pos, float $maxDistDeg): IDbWhereClauseBuilder
    {
        $this->all(
            DbCondSimple::create($latColumn, DbCondOp::GT, $pos->latitude - $maxDistDeg),
            DbCondSimple::create($latColumn, DbCondOp::LT, $pos->latitude + $maxDistDeg),
            DbCondSimple::create($lonColumn, DbCondOp::GT, $pos->longitude - $maxDistDeg),
            DbCondSimple::create($lonColumn, DbCondOp::LT, $pos->longitude + $maxDistDeg)
        );

        return $this;
    }


    public function end(): IDbQueryBuilder
    {
        $this->queryBuilder->whereCondition($this->whereCondition);

        return $this->queryBuilder;
    }
}
