<?php declare(strict_types=1);

namespace Navplan\Enroute\Persistence\Query;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\GeoHelper;
use Navplan\Enroute\Domain\Query\IAirspaceSearchByExtentQuery;
use Navplan\Enroute\Persistence\Model\DbTableAirspace;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAirspaceSearchByExtentQuery implements IAirspaceSearchByExtentQuery {
    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function searchByExtent(Extent2d $extent, int $zoom): array {
        $extent = DbHelper::getDbExtentPolygon2($extent);
        $pixelResolutionDeg = GeoHelper::calcDegPerPixelByZoom($zoom);
        $minDiameterDeg = $pixelResolutionDeg * DbAirspaceSearchQueryCommon::MIN_PIXEL_AIRSPACE_DIAMETER;

        $query = DbAirspaceSearchQueryCommon::getSelectClauseCommonPart();
        $query .= "  air." . DbTableAirspace::COL_POLYGON;
        $query .= " FROM " . DbTableAirspace::TABLE_NAME . " air";
        $query .= "  INNER JOIN openaip_airspace_detaillevels det ON det.airspace_id = air.id";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(air." . DbTableAirspace::COL_EXTENT . ", " . $extent . ")";
        $query .= "    AND";
        $query .= "  (air." . DbTableAirspace::COL_ALT_BOT_HEIGHT . " < " . DbAirspaceSearchQueryCommon::MAX_BOTTOM_ALT_FL . " OR air." . DbTableAirspace::COL_ALT_BOT_UNIT . " <> 'FL')";
        $query .= "    AND";
        $query .= "  air." . DbTableAirspace::COL_DIAMETER . " > " . $minDiameterDeg;
        $query .= "    AND";
        $query .= "  (" . $zoom . " >= det.zoommin AND " . $zoom . "<= det.zoommax)";

        $result = $this->dbService->execMultiResultQuery($query, "error searching airspaces by extent");

        return DbAirspaceSearchQueryCommon::fromDbResult($result);
    }
}
