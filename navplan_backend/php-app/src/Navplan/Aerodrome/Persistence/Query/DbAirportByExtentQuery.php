<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Query;

use Navplan\Aerodrome\Domain\Model\AirportRunwayOperations;
use Navplan\Aerodrome\Domain\Model\ShortAirport;
use Navplan\Aerodrome\Domain\Query\IAirportByExtentQuery;
use Navplan\Aerodrome\Persistence\Model\DbShortAirportConverter;
use Navplan\Aerodrome\Persistence\Model\DbTableAirport;
use Navplan\Aerodrome\Persistence\Model\DbTableAirportRunway;
use Navplan\Aerodrome\Persistence\Model\DbTableMapFeatures;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbAirportByExtentQuery implements IAirportByExtentQuery
{
    public function __construct(
        private readonly IDbService $dbService
    )
    {
    }


    /**
     * @param Extent2d $extent
     * @param int $zoom
     * @return ShortAirport[]
     */
    public function searchShortAirports(Extent2d $extent, int $zoom): array
    {
        $tAd = new DbTableAirport("ad");
        $tRwy = new DbTableAirportRunway("rwy");
        $tFeat = new DbTableMapFeatures("fea");
        /*$query = $this->dbService->getQueryBuilder()
            ->selectFrom(
                $tAd,
                $tAd->colId(),
                $tAd->colType(),
                $tAd->colIcao(),
                $tAd->colLatitude(),
                $tAd->colLongitude(),
                $tRwy->colDirection(),
                $tRwy->colSurface(),
                "GROUP_CONCAT(fea.type) as features" // TODO
            )
            ->join(DbJoinType::LEFT, $tRwy, $tRwy->colAirportId(), $tAd->colId())
            ->join(DbJoinType::LEFT, $tFeat, $tFeat->colAdIcao(), $tAd->colIcao())
            ->where(
                DbCondMulti::all(
                    DbCondGeo::create($tAd->colLonLat(), DbCondOpGeo::INTERSECTS_ST, $extent),
                    DBCondSimple::create($tAd->colZoomMin(), DbCondOp::LT_OR_E, $zoom),
                    DbCondMulti::any(
                        DbCondSimple::equals($tRwy->colId(), null),
                        DbCondMulti::all(
                            DbCondSimple::equals($tRwy->colOperations(), AirportRunwayOperations::ACTIVE->value),
                            DbCondSimple::equals($tRwy->colLength(), "TODO")
                        )
                    )
                )
            );*/

        // TODO: query builder
        $extentPoly = DbHelper::getDbPolygonString($extent);
        $query = "SELECT ";
        $query .= "  ad." . DbTableAirport::COL_ID . ",";
        $query .= "  ad." . DbTableAirport::COL_TYPE . ",";
        $query .= "  ad." . DbTableAirport::COL_ICAO . ",";
        $query .= "  ad." . DbTableAirport::COL_LATITUDE . ",";
        $query .= "  ad." . DbTableAirport::COL_LONGITUDE . ",";
        $query .= "  rwy." . DbTableAirportRunway::COL_DIRECTION . ",";
        $query .= "  rwy." . DbTableAirportRunway::COL_SURFACE . ",";
        $query .= "  GROUP_CONCAT(fea.type) as features";
        $query .= " FROM " . DbTableAirport::TABLE_NAME . " ad";
        $query .= " LEFT JOIN " . DbTableAirportRunway::TABLE_NAME . " rwy ON rwy." . DbTableAirportRunway::COL_AIRPORT_ID . " = ad." . DbTableAirport::COL_ID;
        $query .= " LEFT JOIN map_features fea ON fea.airport_icao = ad." . DbTableAirport::COL_ICAO;
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(ad." . DbTableAirport::COL_LONLAT . ", " . $extentPoly . ")";
        $query .= "    AND";
        $query .= "  ad." . DbTableAirport::COL_ZOOMMIN . " <= " . $zoom;
        $query .= "    AND";
        $query .= "  (";
        $query .= "    rwy." . DbTableAirportRunway::COL_ID . " IS NULL";
        $query .= "      OR";
        $query .= "    (";
        $query .= "      rwy." . DbTableAirportRunway::COL_OPERATIONS . " = '" . AirportRunwayOperations::ACTIVE->value . "'";
        $query .= "        AND";
        $query .= "      rwy.length = (SELECT MAX(" . DbTableAirportRunway::COL_LENGTH . ") FROM " . DbTableAirportRunway::TABLE_NAME . " WHERE " . DbTableAirportRunway::COL_AIRPORT_ID . " = ad." . DbTableAirport::COL_ID . ")";
        $query .= "    )";
        $query .= "  )";
        $query .= "  GROUP BY ad." . DbTableAirport::COL_ID;

        $result = $this->dbService->execMultiResultQuery($query, "error searching airports by extent");
        $converter = new DbShortAirportConverter($tAd, $tRwy);

        return $converter->fromDbResult($result);
    }
}
