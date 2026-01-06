<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;

use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Airspace\Domain\Service\IFirService;
use Navplan\Common\Domain\Model\Circle2d;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\GeoHelper;
use Navplan\Common\InvalidFormatException;
use Navplan\Common\StringNumberHelper;
use Navplan\Notam\Domain\Command\INotamGeometryDeleteAllCommand;
use Navplan\Notam\Domain\Model\RawNotam;
use Navplan\Notam\Domain\Model\RawNotamExtent;
use Navplan\Notam\Domain\Model\RawNotamGeometry;
use Navplan\Notam\Domain\Query\IReadNotamChunkQuery;
use Navplan\Notam\Domain\Query\IReadNotamsByKeyQuery;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\Domain\Service\ILoggingService;


require_once __DIR__ . "/../../ConsoleBootstrap.php";


global $diContainer;

$parser = $diContainer->getNotamDiContainer()->getNotamGeometryParser();
$parser->go();


class NotamGeometryParser implements INotamGeometryParser
{
    const int PROCESS_CHUNK_SIZE = 1000;
    const float MIN_PIXEL_COORDINATE_RESOLUTION = 1.0;
    const int MIN_ZOOM = 0;
    const int MAX_ZOOM = 14;

    // Geometry array keys
    const string GEOM_KEY_POLYGON = 'polygon';
    const string GEOM_KEY_MULTIPOLYGON = 'multipolygon';

    // Zoom level array keys
    const string ZOOM_KEY_MIN = 'zoommin';
    const string ZOOM_KEY_MAX = 'zoommax';


    function __construct(
        private readonly ILoggingService $logger,
        private readonly IDbService $dbService,
        private readonly IReadNotamsByKeyQuery $readNotamsByKeyQuery,
        private readonly IReadNotamChunkQuery $readNotamChunkQuery,
        private readonly INotamGeometryDeleteAllCommand $notamGeometryDeleteAllCommand,
        private readonly IFirService $firService,
        private readonly IAirportService $airportService,
        private readonly NotamCoordinateParser $coordinateParser,
        private readonly NotamAltitudeParser $altitudeParser,
        private readonly NotamCircleGeometryParser $circleGeometryParser,
        private readonly NotamPolygonGeometryParser $polygonGeometryParser,
        private readonly INotamAirspaceParser $airspaceParser,
    )
    {
    }



    /**
     * @throws InvalidFormatException
     */
    public function go(): void
    {
        $this->logger->info("clear geometry table...");
        $this->notamGeometryDeleteAllCommand->deleteAll();

        $lastNotamId = 0;
        do {
            $this->logger->info("loading notams starting after id " . $lastNotamId . "...");
            $notamChunk = $this->readNotamChunkQuery->readNotamChunk($lastNotamId, self::PROCESS_CHUNK_SIZE);
            $this->logger->info(count($notamChunk) . " notams found");

            $this->logger->info("loading extent list...");
            $extentList = $this->loadExtentList($notamChunk);

            $this->logger->info("parse geometry from notam texts...");
            foreach ($notamChunk as &$notam) {
                $icaoApiNotam = IcaoApiNotam::fromJson($notam->notam);

                $notam->geometry = $icaoApiNotam->isICAO 
                    ? $this->parseIcaoNotamGeometry($icaoApiNotam)
                    : $this->parseNonIcaoNotamGeometry($icaoApiNotam);

                $notam->dbExtent = $this->getNotamDbExtent($notam, $icaoApiNotam, $extentList[$notam->icao] ?? null);
            }

            $this->logger->info("try to find matching airspace...");
            $this->airspaceParser->tryFindMatchingAirspace($notamChunk);

            $this->logger->info("calculate different zoom levels...");
            $this->calculateZoomLevelGeometries($notamChunk);

            $this->logger->info("save geometries to db...");
            $this->saveNotamGeometries($notamChunk);

            if (count($notamChunk) > 0)
                $lastNotamId = $notamChunk[count($notamChunk) - 1]->id;

        } while (count($notamChunk) > 0);

        $this->logger->info("done.");
    }


    /**
     * @param RawNotam[] $notamList
     * @return RawNotamExtent[]
     */
    private function loadExtentList(array $notamList): array
    {
        // get distinct ICAOs
        $icaoList = [];
        foreach ($notamList as $notam) {
            if (!in_array($notam->icao, $icaoList))
                $icaoList[] = $notam->icao;
        }

        // load from db
        $firs = $this->firService->readByIcaos($icaoList);
        $ads = $this->airportService->readByIcaos($icaoList);

        // build return list
        $extentList = [];
        foreach ($firs as $fir) {
            $extentList[$fir->icao] = new RawNotamExtent(
                "fir",
                $fir->polygon,
                null
            );
        }
        foreach ($ads as $ad) {
            $extentList[$ad->icao] = new RawNotamExtent(
                "ad",
                null,
                $ad->position
            );
        }

        return $extentList;
    }


    /**
     * @param RawNotam[] $notamList
     * @throws InvalidFormatException
     */
    private function saveNotamGeometries(array $notamList): void
    {
        $queryParts = [];
        foreach ($notamList as $notam) {
            if (!$notam->dbExtent)
                continue;

            $zoommin = "NULL";
            $zoommax = "NULL";
            $geometryString = "NULL";
            $distanceString = "ST_Distance(ST_PointN(ST_ExteriorRing(ST_Envelope(" . $notam->dbExtent . ")), 1), ST_PointN(ST_ExteriorRing(ST_Envelope(" . $notam->dbExtent . ")), 3))";

            if (isset($notam->geometry?->circle)) {
                GeoHelper::reduceCoordinateAccuracy($notam->geometry->circle->center);
                $geometryString = "'" . StringNumberHelper::checkEscapeString($this->dbService, json_encode($notam->geometry, JSON_NUMERIC_CHECK), 0, 999999999) . "'";
                // circle: one entry matches all zoom levels
                $zoommin = 0;
                $zoommax = 255;
            }

            if (isset($notam->polyzoomlevels)) {
                foreach ($notam->polyzoomlevels as $polyZoomLevel) {
                    $geometry = $notam->geometry;
                    $geometry->polygon = $polyZoomLevel[self::GEOM_KEY_POLYGON];
                    GeoHelper::reducePolygonAccuracy($geometry->polygon);
                    $geometryString = "'" . StringNumberHelper::checkEscapeString($this->dbService, json_encode($geometry, JSON_NUMERIC_CHECK), 0, 999999999) . "'";

                    $queryParts[] = "('"
                        . self::checkNumeric($notam->id) . "',"
                        . $polyZoomLevel[self::ZOOM_KEY_MIN] . ","
                        . $polyZoomLevel[self::ZOOM_KEY_MAX] . ","
                        . $geometryString . ","
                        . $distanceString . ","
                        . $notam->dbExtent . ")";
                }
            } elseif (isset($notam->multipolyzoomlevels)) {
                foreach ($notam->multipolyzoomlevels as $multiPolyZoomLevel) {
                    $geometry = $notam->geometry;
                    $geometry->multipolygon = $multiPolyZoomLevel[self::GEOM_KEY_MULTIPOLYGON];
                    GeoHelper::reduceMultiPolygonAccuracy($geometry->multipolygon);
                    $geometryString = "'" . StringNumberHelper::checkEscapeString($this->dbService, json_encode($geometry, JSON_NUMERIC_CHECK), 0, 999999999) . "'";

                    $queryParts[] = "('"
                        . self::checkNumeric($notam->id) . "',"
                        . $multiPolyZoomLevel[self::ZOOM_KEY_MIN] . ","
                        . $multiPolyZoomLevel[self::ZOOM_KEY_MAX] . ","
                        . $geometryString . ","
                        . $distanceString . ","
                        . $notam->dbExtent . ")";
                }
            } else {
                $queryParts[] = "('"
                    . self::checkNumeric($notam->id) . "',"
                    . $zoommin . ","
                    . $zoommax . ","
                    . $geometryString . ","
                    . $distanceString . ","
                    . $notam->dbExtent . ")";
            }
        }


        if (count($queryParts) > 0) {
            $query = "INSERT INTO icao_notam_geometry2 (icao_notam_id, zoommin, zoommax, geometry, diameter, extent) VALUES " . join(",", $queryParts);
            $this->dbService->execCUDQuery($query, "error adding notam geometries");
        }
    }


    /**
     * @param RawNotam[] $notamList
     */
    private function calculateZoomLevelGeometries(array &$notamList): void
    {
        foreach ($notamList as &$notam) {
            if (isset($notam->geometry->polygon)) {
                $zoomLevels = [];
                $polygonOrig = $notam->geometry->polygon;
                $lastPolygonSimple = null;
                $lastPoints = null;
                $lastZoom = 0;

                for ($zoom = self::MIN_ZOOM; $zoom <= self::MAX_ZOOM; $zoom++) {
                    $resolutionDeg = GeoHelper::calcDegPerPixelByZoom($zoom);
                    $pixelResolutionDeg = $resolutionDeg * self::MIN_PIXEL_COORDINATE_RESOLUTION;
                    $polygonSimple = GeoHelper::simplifyPolygon2($polygonOrig, $pixelResolutionDeg);
                    $points = count($polygonSimple->position2dList);

                    if ($lastPoints !== $points) {
                        if ($lastPoints !== null) {
                            $zoomLevels[] = array(
                                self::ZOOM_KEY_MIN => $lastZoom,
                                self::ZOOM_KEY_MAX => $zoom - 1,
                                self::GEOM_KEY_POLYGON => $lastPolygonSimple
                            );
                        }
                        $lastPoints = $points;
                        $lastZoom = $zoom;
                    }

                    if ($zoom === self::MAX_ZOOM) {
                        $zoomLevels[] = array(
                            self::ZOOM_KEY_MIN => $lastZoom,
                            self::ZOOM_KEY_MAX => 255,
                            self::GEOM_KEY_POLYGON => $polygonSimple
                        );
                    }
                    $lastPolygonSimple = $polygonSimple;
                }
                $notam->polyzoomlevels = $zoomLevels;

            } elseif (isset($notam->geometry->multipolygon)) {
                $zoomLevels = [];
                $multiPolyOrig = $notam->geometry->multipolygon;
                $lastMultiPolySimple = null;
                $lastPoints = null;
                $lastZoom = 0;

                for ($zoom = self::MIN_ZOOM; $zoom <= self::MAX_ZOOM; $zoom++) {
                    $resolutionDeg = GeoHelper::calcDegPerPixelByZoom($zoom);
                    $pixelResolutionDeg = $resolutionDeg * self::MIN_PIXEL_COORDINATE_RESOLUTION;
                    $multiPolySimple = GeoHelper::simplifyMultipolygon2($multiPolyOrig, $pixelResolutionDeg);
                    $points = 0;
                    foreach ($multiPolySimple->ring2dList as $ring2dSimple) {
                        $points += count($ring2dSimple->position2dList);
                    }

                    if ($lastPoints !== $points) {
                        if ($lastPoints !== null) {
                            $zoomLevels[] = array(
                                self::ZOOM_KEY_MIN => $lastZoom,
                                self::ZOOM_KEY_MAX => $zoom - 1,
                                self::GEOM_KEY_MULTIPOLYGON => $lastMultiPolySimple
                            );
                        }
                        $lastPoints = $points;
                        $lastZoom = $zoom;
                    }

                    if ($zoom === self::MAX_ZOOM) {
                        $zoomLevels[] = array(
                            self::ZOOM_KEY_MIN => $lastZoom,
                            self::ZOOM_KEY_MAX => 255,
                            self::GEOM_KEY_MULTIPOLYGON => $multiPolySimple
                        );
                    }

                    $lastMultiPolySimple = $multiPolySimple;
                }
                $notam->multipolyzoomlevels = $zoomLevels;
            }
        }
    }


    private function parseIcaoNotamGeometry(IcaoApiNotam $icaoApiNotam): ?RawNotamGeometry
    {
        $geometry = new RawNotamGeometry();

        $this->logger->debug("notam format: icao");

        // Bottom/Top Altitude:
        // try to parse the notam altitude from F) and G) lines (=prio 1) or from the q-line otherwise (=prio 2)
        $bottomTop = $this->altitudeParser->parseAltitudes($icaoApiNotam);
        if ($bottomTop) {
            $geometry->bottom = $bottomTop[0];
            $geometry->top = $bottomTop[1];
        }

        // Polygon / Circle:
        // try to parse polygon first (prio 1), then circle variants 1-3 (prio 2), then q-line circle (prio 3)
        $isMixedPolyCircle = false;
        $polygon = $this->polygonGeometryParser->tryParsePolygon($icaoApiNotam->message);
        if ($polygon) {
            if (!str_contains($icaoApiNotam->message, "CIRCLE")) {
                $geometry->polygon = $polygon;

                return $geometry;
            } else {
                $isMixedPolyCircle = true;
            }
        }

        if (!$isMixedPolyCircle) {
            $circle = $this->circleGeometryParser->tryParseCircleFromMessageVariant1($icaoApiNotam->message);
            if ($circle) {
                $geometry->circle = $circle;

                return $geometry;
            }

            $circle = $this->circleGeometryParser->tryParseCircleFromMessageVariant2($icaoApiNotam->message);
            if ($circle) {
                $geometry->circle = $circle;

                return $geometry;
            }

            $circle = $this->circleGeometryParser->tryParseCircleFromMessageVariant3($icaoApiNotam->message);
            if ($circle) {
                $geometry->circle = $circle;

                return $geometry;
            }
        }

        if ($icaoApiNotam->qLine) {
            $circle = $icaoApiNotam->qLine->getCircle();
            $this->logger->debug("circle geometry in qline found: " . $circle->toString());

            $geometry->circle = $circle;

            return $geometry;
        }

        // no match
        return null;
    }


    private function parseNonIcaoNotamGeometry(IcaoApiNotam $icaoApiNotam): ?RawNotamGeometry
    {
        $geometry = new RawNotamGeometry();

        $this->logger->debug("notam format: non-icao");

        $polygon = $this->polygonGeometryParser->tryParsePolygon($icaoApiNotam->all);
        if ($polygon) {
            $geometry->polygon = $polygon;

            return $geometry;
        }

        $circle = $this->circleGeometryParser->tryParseCircleFromMessageVariant1($icaoApiNotam->all);
        if ($circle) {
            $geometry->circle = $circle;

            return $geometry;
        }

        $circle = $this->circleGeometryParser->tryParseCircleFromMessageVariant2($icaoApiNotam->all);
        if ($circle) {
            $geometry->circle = $circle;

            return $geometry;
        }

        $circle = $this->circleGeometryParser->tryParseCircleFromMessageVariant3($icaoApiNotam->all);
        if ($circle) {
            $geometry->circle = $circle;

            return $geometry;
        }

        // no match
        return null;
    }


    private function getNotamDbExtent(RawNotam $notam, IcaoApiNotam $icaoApiNotam, ?RawNotamExtent $locationExtent): ?string
    {
        // polygon geometry
        if (isset($notam->geometry->polygon)) {
            $this->logger->debug("using polygon geometry as db extent");

            return DbHelper::getDbPolygonString($notam->geometry->polygon);
        }


        // circle geometry
        if (isset($notam->geometry->circle)) {
            $this->logger->debug("using circle geometry as db extent");
            $polygon = GeoHelper::getCircleExtent($notam->geometry->circle);

            return DbHelper::getDbPolygonString($polygon);
        }


        // circle from qline
        if ($icaoApiNotam->isICAO && $icaoApiNotam->qLine) {
            $circle = $icaoApiNotam->qLine->getCircle();
            $this->logger->debug("using q-line circle geometry as db extent");

            $polygon = GeoHelper::getCircleExtent($circle);
            return DbHelper::getDbPolygonString($polygon);
        }


        // ad notam
        if ($locationExtent !== null && $locationExtent->type == "ad") {
            $this->logger->debug("using ad coordinates + 5nm as db extent");

            $circle = new Circle2d($locationExtent->adPosition, Length::fromNm(5));
            $polygon = GeoHelper::getCircleExtent($circle);

            return DbHelper::getDbPolygonString($polygon);
        }


        // fir notam
        if ($locationExtent !== null && $locationExtent->type == "fir") {
            $this->logger->debug("using fir polygon geometry as db extent");

            return DbHelper::getDbMultiPolygonString($locationExtent->firPolygon->ring2dList);
        }


        // no extent found
        $this->logger->debug("no geometry found as db extent");

        return null;
    }


    private static function checkNumeric($num)
    {
        if (!is_numeric($num))
            die("format error: '" . $num . "' is not numeric");

        return $num;
    }
}
