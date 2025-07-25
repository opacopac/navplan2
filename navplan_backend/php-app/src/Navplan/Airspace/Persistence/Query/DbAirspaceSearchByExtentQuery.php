<?php declare(strict_types=1);

namespace Navplan\Airspace\Persistence\Query;

use Navplan\Airspace\Domain\Query\IAirspaceSearchByExtentQuery;
use Navplan\Airspace\Persistence\Model\DbTableAirspace;
use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\GeoHelper;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbAirspaceSearchByExtentQuery implements IAirspaceSearchByExtentQuery {
    public function __construct(
        private IDbService $dbService
    ) {
    }


    public function searchByExtent(Extent2d $extent, int $zoom): array {
        $extent = DbHelper::getDbPolygonString($extent);
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
