<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Query;

use Navplan\Airspace\Domain\Query\IAirspaceSearchByRouteQuery;
use Navplan\Airspace\Persistence\Model\DbAirspaceConverter;
use Navplan\Airspace\Persistence\Model\DbTableAirspace;
use Navplan\Common\Domain\Model\Line2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;


class DbAirspaceSearchByRouteQuery implements IAirspaceSearchByRouteQuery
{
    private const MAX_BOTTOM_ALT_FL = 200;


    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function searchByRouteIntersection(array $pos2dList): array
    {
        $t = new DbTableAirspace();
        $line = new Line2d($pos2dList);
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
                $t->colPolygon()
            )
            ->where(
                DbCondMulti::all(
                    DbCondGeo::create($t->colExtent(), DbCondOpGeo::INTERSECTS_ST, $line),
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
