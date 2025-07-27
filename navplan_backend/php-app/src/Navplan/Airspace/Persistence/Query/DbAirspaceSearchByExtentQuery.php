<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Query;

use Navplan\Airspace\Domain\Query\IAirspaceSearchByExtentQuery;
use Navplan\Airspace\Persistence\Model\DbAirspaceConverter;
use Navplan\Airspace\Persistence\Model\DbTableAirspace;
use Navplan\Airspace\Persistence\Model\DbTableAirspaceDetailLevels;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\GeoHelper;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondMulti;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOp;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondOpGeo;
use Navplan\System\DbQueryBuilder\Domain\Model\DbCondSimple;
use Navplan\System\DbQueryBuilder\Domain\Model\DbJoinType;


class DbAirspaceSearchByExtentQuery implements IAirspaceSearchByExtentQuery
{
    private const MIN_PIXEL_AIRSPACE_DIAMETER = 50;  // TODO
    private const MAX_BOTTOM_ALT_FL = 200;


    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    public function searchByExtent(Extent2d $extent, int $zoom): array
    {
        $t = new DbTableAirspace("air");
        $tDet = new DbTableAirspaceDetailLevels("det");

        $pixelResolutionDeg = GeoHelper::calcDegPerPixelByZoom($zoom);
        $minDiameterDeg = $pixelResolutionDeg * self::MIN_PIXEL_AIRSPACE_DIAMETER;
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
            ->join(DbJoinType::INNER, $tDet, $t->colId(), $tDet->colAirspaceId())
            ->where(
                DbCondMulti::all(
                    DbCondGeo::create($t->colExtent(), DbCondOpGeo::INTERSECTS_ST, $extent),
                    DbCondMulti::any(
                        DbCondSimple::create($t->colAltBotHeight(), DbCondOp::LT, self::MAX_BOTTOM_ALT_FL),
                        DbCondSimple::create($t->colAltBotUnit(), DbCondOp::NE, "FL"),
                    ),
                    DbCondSimple::create($t->colDiameter(), DbCondOp::GT, $minDiameterDeg),
                    DbCondMulti::all(
                        DbCondSimple::create($tDet->colZoomMin(), DbCondOp::LT_OR_E, $zoom),
                        DbCondSimple::create($tDet->colZoomMax(), DbCondOp::GT_OR_E, $zoom)
                    )
                )
            )
            ->build();

        $result = $this->dbService->execMultiResultQuery($query, "error searching airspaces by extent");
        $converter = new DbAirspaceConverter($t);

        return $converter->fromDbResult($result);
    }
}
