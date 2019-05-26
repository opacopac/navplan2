<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\Geometry\Domain\Extent;
use Navplan\OpenAip\Domain\Airspace;
use Navplan\OpenAip\Domain\AirspaceAltitude;
use Navplan\OpenAip\IRepo\IAirspaceRepo;
use Navplan\Shared\DbHelper;
use Navplan\Geometry\Domain\Polygon;
use Navplan\Shared\GeoService;
use Navplan\Shared\IDbResult;
use Navplan\Shared\IDbService;


class AirspaceDbRepo implements IAirspaceRepo {
    const MAX_BOTTOM_ALT_FL = 200;
    const MIN_PIXEL_AIRSPACE_DIAMETER = 50;  // TODO
    const MIN_PIXEL_COORDINATE_RESOLUTION = 2;  // TODO

    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function searchByExtent(Extent $extent, int $zoom): array {
        $extent = DbHelper::getDbExtentPolygon2($extent);
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
        $result = $this->getDbService()->execMultiResultQuery($query, "error reading airspaces");

        return $this->readAirspaceFromResultList($result, $pixelResolutionDeg);
    }


    private function readAirspaceFromResultList(IDbResult $result, float $pixelResolutionDeg): array
    {
        $airspaces = [];
        while ($rs = $result->fetch_assoc()) {
            $airspaces[] = $this->readAirspaceFromResult($rs, $pixelResolutionDeg);
        }
        return $airspaces;
    }


    private function readAirspaceFromResult(array $rs, float $pixelResolutionDeg): Airspace {
        return new Airspace(
            intval($rs["id"]),
            intval($rs["aip_id"]),
            $rs["category"],
            $rs["country"],
            $rs["name"],
            new AirspaceAltitude(
                $rs["alt_bottom_reference"],
                intval($rs["alt_bottom_height"]),
                $rs["alt_bottom_unit"]
            ),
            new AirspaceAltitude(
                $rs["alt_top_reference"],
                intval($rs["alt_top_height"]),
                $rs["alt_top_unit"]
            ),
            Polygon::createFromString($rs["polygon"])
        );
    }
}
