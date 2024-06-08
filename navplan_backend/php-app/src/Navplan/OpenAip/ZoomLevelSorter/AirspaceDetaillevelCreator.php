<?php declare(strict_types=1);

namespace Navplan\OpenAip\ZoomLevelSorter;

use Navplan\Airspace\Persistence\Model\DbTableAirspace;
use Navplan\Common\GeoHelper;
use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ILoggingService;


class AirspaceDetaillevelCreator {
    const MIN_PIXEL_COORDINATE_RESOLUTION = 1.0;
    const MIN_ZOOM = 0;
    const MAX_ZOOM = 14;


    public function __construct(
        private IDbService $dbService,
        private ILoggingService $loggingService
    ) {
    }


    public function go() {
        $query = "TRUNCATE openaip_airspace_detaillevels";
        $this->dbService->execCUDQuery($query);


        $query = "SELECT";
        $query .= " " . DbTableAirspace::COL_ID . ",";
        $query .= " " . DbTableAirspace::COL_POLYGON . ",";
        $query .= " ST_Distance(ST_PointN(ST_ExteriorRing(ST_Envelope(" . DbTableAirspace::COL_EXTENT . ")), 1), ST_PointN(ST_ExteriorRing(ST_Envelope(" . DbTableAirspace::COL_EXTENT . ")), 3)) AS diameter";
        $query .= " FROM " . DbTableAirspace::TABLE_NAME;
        $result = $this->dbService->execMultiResultQuery($query, "error reading airspaces");

        $numAsProcessed = 0;
        while ($rs = $result->fetch_assoc()) {
            if ($numAsProcessed % 500 == 0) {
                $this->loggingService->info("processing " . $numAsProcessed . " airspaces...");
            }

            $numAsProcessed++;

            $id = $rs[DbTableAirspace::COL_ID];
            $diameter = $rs["diameter"];
            $this->writeDistance($id, $diameter);

            $polygonOrig = GeoHelper::parsePolygonFromString($rs[DbTableAirspace::COL_POLYGON], 4);
            $origPoints = count($polygonOrig);
            $lastPoints = null;
            $lastZoom = 0;

            for ($zoom = self::MIN_ZOOM; $zoom <= self::MAX_ZOOM; $zoom++) {
                $resolutionDeg = GeoHelper::calcDegPerPixelByZoom($zoom);
                $pixelResolutionDeg = $resolutionDeg * self::MIN_PIXEL_COORDINATE_RESOLUTION;
                $polygonSimple = GeoHelper::simplifyPolygon($polygonOrig, $pixelResolutionDeg);
                $points = count($polygonSimple);

                if ($lastPoints != $points) {
                    if ($lastPoints != null) {
                        $polygonString = GeoHelper::joinPolygonToString($polygonSimple);
                        $this->writePolygonDetailLevel($id, $lastZoom, $zoom - 1, $polygonString);
                    }
                    $lastPoints = $points;
                    $lastZoom = $zoom;
                }

                if ($zoom == self::MAX_ZOOM) {
                    $polygonString = GeoHelper::joinPolygonToString($polygonSimple);
                    $this->writePolygonDetailLevel($id, $lastZoom, 255, $polygonString);
                }
            }
        }

        $this->loggingService->info("processing " . $numAsProcessed . " airspaces... done!");
    }


    private function writeDistance($id, $diameter) {
        $query = "UPDATE " . DbTableAirspace::TABLE_NAME;
        $query .= " SET " . DbTableAirspace::COL_DIAMETER . "=" . $diameter;
        $query .= " WHERE id =" . $id;

        $this->dbService->execCUDQuery($query);
    }


    private function writePolygonDetailLevel($id, $minZoom, $maxZoom, $polygonString) {
        $query = "INSERT INTO openaip_airspace_detaillevels";
        $query .= " (airspace_id, zoommin, zoommax, polygon)";
        $query .= " VALUES ('" . $id . "','" . $minZoom . "','" . $maxZoom . "','" . $polygonString . "')";

        $this->dbService->execCUDQuery($query);
    }
}
