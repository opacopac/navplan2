<?php declare(strict_types=1);

namespace Navplan\Enroute\DbService;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\GeoHelper;
use Navplan\Enroute\DbModel\DbAirspaceConverter;
use Navplan\Enroute\DomainService\IAirspaceService;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbAirspaceService implements IAirspaceService {
    const MAX_BOTTOM_ALT_FL = 200;
    const MIN_PIXEL_AIRSPACE_DIAMETER = 50;  // TODO
    const MIN_PIXEL_COORDINATE_RESOLUTION = 2;  // TODO

    public function __construct(private IDbService $dbService) {
    }


    public function searchByExtent(Extent2d $extent, int $zoom): array {
        $extent = DbHelper::getDbExtentPolygon2($extent);
        $pixelResolutionDeg = GeoHelper::calcDegPerPixelByZoom($zoom);
        $minDiameterDeg = $pixelResolutionDeg * self::MIN_PIXEL_AIRSPACE_DIAMETER;
        $query  = "SELECT";
        $query .= "  air.id,";
        $query .= "  air.aip_id,";
        $query .= "  air.category,";
        $query .= "  air.country,";
        $query .= "  air.name,";
        $query .= "  det.polygon,";
        $query .= "  air.alt_top_reference,";
        $query .= "  air.alt_top_height,";
        $query .= "  air.alt_top_unit,";
        $query .= "  air.alt_bottom_reference,";
        $query .= "  air.alt_bottom_height,";
        $query .= "  air.alt_bottom_unit";
        $query .= " FROM openaip_airspace2 air";
        $query .= "  INNER JOIN openaip_airspace_detaillevels det ON det.airspace_id = air.id";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(air.extent, " . $extent . ")";
        $query .= "    AND";
        $query .= "  (air.alt_bottom_height < " . self::MAX_BOTTOM_ALT_FL . " OR air.alt_bottom_unit <> 'FL')";
        $query .= "    AND";
        $query .= "  air.diameter > " . $minDiameterDeg;
        $query .= "    AND";
        $query .= "  (" . $zoom . " >= det.zoommin AND " . $zoom . "<= det.zoommax)";
        //$query .= "  ST_Distance(ST_PointN(ST_ExteriorRing(ST_Envelope(extent)), 1), ST_PointN(ST_ExteriorRing(ST_Envelope(extent)), 3)) > " . $minDiameterDeg;
        $result = $this->dbService->execMultiResultQuery($query, "error searching airspaces by extent");

        return DbAirspaceConverter::fromDbResult($result);
    }


    public function searchByRouteIntersection(array $lonLatList): array {
        $lineString = DbHelper::getDbLineString($lonLatList);
        $query  = "SELECT";
        $query .= "  air.id,";
        $query .= "  air.aip_id,";
        $query .= "  air.category,";
        $query .= "  air.country,";
        $query .= "  air.name,";
        $query .= "  air.polygon,";
        $query .= "  air.alt_top_reference,";
        $query .= "  air.alt_top_height,";
        $query .= "  air.alt_top_unit,";
        $query .= "  air.alt_bottom_reference,";
        $query .= "  air.alt_bottom_height,";
        $query .= "  air.alt_bottom_unit";
        $query .= " FROM openaip_airspace2 air";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(air.extent, " . $lineString . ")";
        $query .= "    AND";
        $query .= "  (air.alt_bottom_height < " . self::MAX_BOTTOM_ALT_FL . " OR air.alt_bottom_unit <> 'FL')";
        $result = $this->dbService->execMultiResultQuery($query, "error searching airspaces by line");

        return DbAirspaceConverter::fromDbResult($result);
    }
}
