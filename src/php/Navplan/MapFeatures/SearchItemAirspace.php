<?php declare(strict_types=1);

namespace Navplan\MapFeatures;

use Navplan\Shared\DbConnection;
use Navplan\Shared\DbHelper;
use Navplan\Shared\DbResult;
use Navplan\Shared\DbService;
use Navplan\Shared\GeoService;
use Navplan\Shared\DbException;

include_once __DIR__ . "/../NavplanHelper.php";

class SearchItemAirspace {
    const MAX_BOTTOM_ALT_FL = 200;
    const MIN_PIXEL_AIRSPACE_DIAMETER = 50;  // TODO
    const MIN_PIXEL_COORDINATE_RESOLUTION = 2;  // TODO


    /**
     * @param DbConnection $conn
     * @param float $minLon
     * @param float $minLat
     * @param float $maxLon
     * @param float $maxLat
     * @param int $zoom
     * @return array
     * @throws DbException
     */
    public static function searchByExtent(DbConnection $conn, float $minLon, float $minLat, float $maxLon, float $maxLat, int $zoom): array {
        $extent = DbHelper::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $pixelResolutionDeg = GeoService::calcDegPerPixelByZoom($zoom);
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
        $result = DbService::execMultiResultQuery($conn, $query, "error reading airspaces");

        return self::readAirspaceFromResultList($result, $pixelResolutionDeg);
    }


    private static function readAirspaceFromResultList(DbResult $result, float $pixelResolutionDeg): array
    {
        $airspaces = [];
        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $airspaces[$rs["aip_id"]] = self::readAirspaceFromResult($rs, $pixelResolutionDeg);
        }
        return $airspaces;
    }


    private static function readAirspaceFromResult(array $rs, float $pixelResolutionDeg): array {
        // prepare coordinates
        $polygon = GeoService::parsePolygonFromString($rs["polygon"], 4);
        //$resolutionDeg = $pixelResolutionDeg * self::MIN_PIXEL_COORDINATE_RESOLUTION;
        //$polygon = GeoService::simplifyPolygon($polygon, $resolutionDeg);

        return array(
            "id" => (int)$rs["id"],
            "aip_id" => (int)$rs["aip_id"],
            "category" => $rs["category"],
            "country" => $rs["country"],
            "name" => $rs["name"],
            "alt" => array(
                "top" => array(
                    "ref" => $rs["alt_top_reference"],
                    "height" => $rs["alt_top_height"],
                    "unit" => $rs["alt_top_unit"]
                ),
                "bottom" => array(
                    "ref" => $rs["alt_bottom_reference"],
                    "height" => $rs["alt_bottom_height"],
                    "unit" => $rs["alt_bottom_unit"]
                )
            ),
            "polygon" => $polygon
        );
    }
}
