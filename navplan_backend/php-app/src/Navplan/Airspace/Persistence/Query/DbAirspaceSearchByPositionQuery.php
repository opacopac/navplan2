<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Query;

use Navplan\Airspace\Domain\Query\IAirspaceSearchByPositionQuery;
use Navplan\Airspace\Persistence\Model\DbAirspaceConverter;
use Navplan\Airspace\Persistence\Model\DbTableAirspace;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;


class DbAirspaceSearchByPositionQuery implements IAirspaceSearchByPositionQuery
{
    private const MAX_BOTTOM_ALT_FL = 200;


    public function __construct(
        private IDbService $dbService
    )
    {
    }


    public function searchByPosition(Position2d $position2d): array
    {
        $t = new DbTableAirspace();
        $query = $this->dbService->getQueryBuilder()
            ->selectFrom(
                $t,
                $t->colId(),
                $t->colCategory(),
                $t->colClass(),
                $t->colType(),
                $t->colCountry(),
                $t->colName(),
                $t->colAltTopRef(),
                $t->colAltTopHeight(),
                $t->colAltTopUnit(),
                $t->colAltBotRef(),
                $t->colAltBotHeight(),
                $t->colAltBotUnit(),
                "NULL AS " . $t->colPolygon()->getName() // TODO
            )
            ->where(
                DbCondMulti::all(
                    DbCondGeo::create($t->colExtent(), DbCondOpGeo::INTERSECTS_ST, $position2d),
                    DbCondMulti::any(
                        DbCondSimple::create($t->colAltBotHeight(), DbCondOp::LT, self::MAX_BOTTOM_ALT_FL),
                        DbCondSimple::create($t->colAltBotUnit(), DbCondOp::NE, "FL"),
                    ),
                )
            )
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching airspaces by line");
        $converter = new DbAirspaceConverter($t);

        return $converter->fromDbResult($result);
    }
}
