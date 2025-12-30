<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\Circle2d;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Ring2d;
use Navplan\Common\GeoHelper;
use Navplan\Common\InvalidFormatException;
use Navplan\Common\StringNumberHelper;
use Navplan\Notam\Domain\Command\INotamGeometryDeleteAllCommand;
use Navplan\Notam\Domain\Model\RawNotam;
use Navplan\Notam\Domain\Model\RawNotamGeometry;
use Navplan\Notam\Domain\Query\IReadNotamChunkQuery;
use Navplan\Notam\Domain\Query\IReadNotamsByKeyQuery;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\Domain\Service\ILoggingService;


require_once __DIR__ . "/IcaoApiNotam.php";
require_once __DIR__ . "/../../ConsoleBootstrap.php";


global $diContainer;

$parser = new NotamGeometryParser(
    $diContainer->getSystemDiContainer()->getLoggingService(),
    $diContainer->getPersistenceDiContainer()->getDbService(),
    $diContainer->getNotamDiContainer()->getReadNotamsByKeyQuery(),
    $diContainer->getNotamDiContainer()->getReadNotamChunkQuery(),
    $diContainer->getNotamDiContainer()->getNotamGeometryDeleteAllCommand(),
);
if (isset($_GET["testnotamid"])) {
    $parser->test($_GET["testnotamid"]);
} else {
    $parser->go();
}


class NotamGeometryParser
{
    const int PROCESS_CHUNK_SIZE = 1000;
    const float MIN_PIXEL_COORDINATE_RESOLUTION = 1.0;
    const int MIN_ZOOM = 0;
    const int MAX_ZOOM = 14;

    // Geometry array keys
    const string GEOM_KEY_POLYGON = 'polygon';
    const string GEOM_KEY_MULTIPOLYGON = 'multipolygon';
    const string GEOM_KEY_TOP = 'top';
    const string GEOM_KEY_BOTTOM = 'bottom';

    // Zoom level array keys
    const string ZOOM_KEY_MIN = 'zoommin';
    const string ZOOM_KEY_MAX = 'zoommax';


    function __construct(
        private readonly ILoggingService $logger,
        private readonly IDbService $dbService,
        private readonly IReadNotamsByKeyQuery $readNotamsByKeyQuery,
        private readonly IReadNotamChunkQuery $readNotamChunkQuery,
        private readonly INotamGeometryDeleteAllCommand $notamGeometryDeleteAllCommand,
    )
    {
    }


    /**
     * @throws InvalidFormatException
     */
    public function test(string $testNotamId): void
    {
        $testNotamId = StringNumberHelper::checkEscapeString($this->dbService, $testNotamId, 1, 20);
        $this->logger->info("loading test notam '" . $testNotamId . "'...");
        $notamList = $this->readNotamsByKeyQuery->readNotamsByKey($testNotamId);
        if (count($notamList) == 0) {
            $this->logger->warning("notam not found, exiting.");
            return;
        }

        $this->logger->debug(count($notamList) . " notams found");

        foreach ($notamList as $notam) {
            $this->logger->debug("id: " . $notam->id);
            $this->logger->debug("icao: " . $notam->icao);
            $this->logger->debug("notam: " . $notam->notam);
            $this->logger->info("loading extent list...");
        }

        $extentList = $this->loadExtentList($notamList);


        $this->logger->info("parse geometry from notam texts...");
        foreach ($notamList as &$notam) {
            $this->logger->debug("notam id:" . $notam->id);
            $icaoApiNotam = IcaoApiNotam::fromJson($notam->notam);
            $notam->geometry = $this->parseNotamGeometry($icaoApiNotam);
            $notam->dbExtent = $this->getNotamDbExtent($notam, $icaoApiNotam, $extentList[$notam->icao]);
        }

        // try match with airspace name
        $this->logger->info("try to find matching airspace...");
        $this->tryFindMatchingAirspace($notamList);

        $this->logger->info("calculate different zoom levels...");
        $this->calculateZoomLevelGeometries($notamList);

        foreach ($notamList as $notam) {
            // print notam geometries
            if ($notam->geometry?->circle) {
                $this->logger->debug("geometry.circle:" . $notam->geometry->circle->toString());
            }

            if ($notam->geometry->polygon) {
                $this->logger->debug("geometry.polygon:" . $notam->geometry->polygon->toString());
            }

            if ($notam->geometry->multipolygon) {
                $counter = 0;
                foreach ($notam->geometry->multipolygon->ring2dList as $polygon) {
                    $counter++;
                    $this->logger->debug("geometry.multipolygon(" . $counter . "):" . $polygon->toString());
                }
            }

            if ($notam->geometry?->top) {
                $this->logger->debug("geometry.top:" . $notam->geometry->top->toString());
            }

            if ($notam->geometry?->bottom) {
                $this->logger->debug("geometry.bottom:" . $notam->geometry->bottom->toString());
            }

            if ($notam->geometry["dbExtent"]) {
                $this->logger->debug("dbExtent:" . $notam->dbExtent);
            }

            if ($notam->polyzoomlevels) {
                foreach ($notam->polyzoomlevels as $polyzoomlevel) {
                    $this->logger->debug("zoom:" . $polyzoomlevel[self::ZOOM_KEY_MIN] . "-" . $polyzoomlevel[self::ZOOM_KEY_MAX] . ", polygon: " . StringNumberHelper::array_implode(",", " ", $polyzoomlevel[self::GEOM_KEY_POLYGON]));
                }
            }

            if ($notam->multipolyzoomlevels) {
                foreach ($notam->multipolyzoomlevels as $multipolyzoomlevel) {
                    $counter = 0;
                    foreach ($multipolyzoomlevel[self::GEOM_KEY_MULTIPOLYGON] as $polygon) {
                        $counter++;
                        $this->logger->debug("zoom:" . $multipolyzoomlevel[self::ZOOM_KEY_MIN] . "-" . $multipolyzoomlevel[self::ZOOM_KEY_MAX] . ", multipolygon(" . $counter . "): " . StringNumberHelper::array_implode(",", " ", $polygon));
                    }
                }
            }
        }

        $this->logger->info("done.");
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

            // parse geometry from notam text
            $this->logger->info("parse geometry from notam texts...");
            foreach ($notamChunk as &$notam) {
                $icaoApiNotam = IcaoApiNotam::fromJson($notam->notam);
                $notam->geometry = $this->parseNotamGeometry($icaoApiNotam);
                $notam->dbExtent = $this->getNotamDbExtent($notam, $icaoApiNotam, $extentList[$notam->icao] ?? null);
            }

            $this->logger->info("try to find matching airspace...");
            $this->tryFindMatchingAirspace($notamChunk);

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
     * @return array
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
        $query = "SELECT 'fir' AS type, icao, ST_AsText(polygon) AS polygon, NULL AS lonlat FROM icao_fir WHERE icao IN ('" . join("','", $icaoList) . "')"
            . " UNION "
            . "SELECT 'ad' AS type, icao, NULL AS polygon, ST_AsText(lonlat) as lonlat FROM openaip_airports WHERE icao IN ('" . join("','", $icaoList) . "')";
        $result = $this->dbService->execMultiResultQuery($query, "error reading firs/ads");

        // build return list
        $extentList = array();
        while ($rs = $result->fetch_assoc()) {
            $extentList[$rs["icao"]] = array(
                "type" => $rs["type"],
                "polygon" => $rs["polygon"],
                "lonlat" => $rs["lonlat"]
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
                    $geometry[self::GEOM_KEY_POLYGON] = $polyZoomLevel[self::GEOM_KEY_POLYGON];
                    GeoHelper::reducePolygonAccuracy($geometry[self::GEOM_KEY_POLYGON]);
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
                    $geometry[self::GEOM_KEY_MULTIPOLYGON] = $multiPolyZoomLevel[self::GEOM_KEY_MULTIPOLYGON];
                    GeoHelper::reduceMultiPolygonAccuracy($geometry[self::GEOM_KEY_MULTIPOLYGON]);
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
            if (isset($notam->geometry[self::GEOM_KEY_POLYGON])) {
                $zoomLevels = [];
                $polygonOrig = $notam->geometry[self::GEOM_KEY_POLYGON];
                $lastPolygonSimple = null;
                $lastPoints = null;
                $lastZoom = 0;

                for ($zoom = self::MIN_ZOOM; $zoom <= self::MAX_ZOOM; $zoom++) {
                    $resolutionDeg = GeoHelper::calcDegPerPixelByZoom($zoom);
                    $pixelResolutionDeg = $resolutionDeg * self::MIN_PIXEL_COORDINATE_RESOLUTION;
                    $polygonSimple = GeoHelper::simplifyPolygon($polygonOrig, $pixelResolutionDeg);
                    $points = count($polygonSimple);

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

            } elseif (isset($notam->geometry[self::GEOM_KEY_MULTIPOLYGON])) {
                $zoomLevels = [];
                $multiPolyOrig = $notam->geometry[self::GEOM_KEY_MULTIPOLYGON];
                $lastMultiPolySimple = null;
                $lastPoints = null;
                $lastZoom = 0;

                for ($zoom = self::MIN_ZOOM; $zoom <= self::MAX_ZOOM; $zoom++) {
                    $resolutionDeg = GeoHelper::calcDegPerPixelByZoom($zoom);
                    $pixelResolutionDeg = $resolutionDeg * self::MIN_PIXEL_COORDINATE_RESOLUTION;
                    $multiPolySimple = GeoHelper::simplifyMultipolygon($multiPolyOrig, $pixelResolutionDeg);
                    $points = 0;
                    foreach ($multiPolySimple as $polygonSimple) {
                        $points += count($polygonSimple);
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


    private function parseNotamGeometry(IcaoApiNotam $icaoApiNotam): ?RawNotamGeometry
    {
        $geometry = new RawNotamGeometry();

        if ($icaoApiNotam->isICAO) {
            $this->logger->debug("notam format: icao");

            // Bottom/Top Altitude:
            // try to parse the notam altitude from F) and G) lines (=prio 1) or from the q-line otherwise (=prio 2)
            $bottomTop = NotamAltitudeLinesParser::tryParseAltitudesFromGAndFLines($icaoApiNotam->all);
            if ($bottomTop) {
                $this->logger->debug("message top/bottom found: " . $bottomTop[0]->toString() . ", " . $bottomTop[1]->toString());

                $geometry->bottom = $bottomTop[0];
                $geometry->top = $bottomTop[1];
            } else if ($icaoApiNotam->qLine?->lowerLimit && $icaoApiNotam->qLine?->upperLimit) {
                $this->logger->debug("qline top/bottom found: " . $icaoApiNotam->qLine->lowerLimit->toString()
                    . ", " . $icaoApiNotam->qLine->upperLimit->toString());

                $geometry->bottom = $icaoApiNotam->qLine->lowerLimit;
                $geometry->top = $icaoApiNotam->qLine->upperLimit;
            }

            // Polygon / Circle:
            // try to parse polygon first (prio 1), then circle variants 1-3 (prio 2), then q-line circle (prio 3)
            $isMixedPolyCircle = false;
            $polygon = $this->tryParsePolygon($icaoApiNotam->message);
            if ($polygon) {
                if (!str_contains($icaoApiNotam->message, "CIRCLE")) {
                    $this->logger->debug("pure polygon geometry in message found: " . $polygon->toString());

                    $geometry->polygon = $polygon;

                    return $geometry;
                } else {
                    $this->logger->debug("mixed polygon+circle geometry in message found");

                    $isMixedPolyCircle = true;
                }
            }

            if (!$isMixedPolyCircle) {
                $circle = NotamCircleGeometryParser::tryParseCircleFromMessageVariant1($icaoApiNotam->message);
                if ($circle) {
                    $this->logger->debug("circle geometry v1 in message found: " . $circle->toString());

                    $geometry->circle = $circle;

                    return $geometry;
                }

                $circle = NotamCircleGeometryParser::tryParseCircleFromMessageVariant2($icaoApiNotam->message);
                if ($circle) {
                    $this->logger->debug("circle geometry v2 in message found: " . $circle->toString());

                    $geometry->circle = $circle;

                    return $geometry;
                }

                $circle = NotamCircleGeometryParser::tryParseCircleFromMessageVariant3($icaoApiNotam->message);
                if ($circle) {
                    $this->logger->debug("circle geometry v3 in message found: " . $circle->toString());

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
        } else {
            $this->logger->debug("notam format: non-icao");

            $polygon = $this->tryParsePolygon($icaoApiNotam->all);
            if ($polygon) {
                $this->logger->debug("pure polygon geometry in message found: " . implode(",", array_map(function ($poly) {
                        return $poly[0] . " " . $poly[1];
                    }, $polygon)));

                $geometry[self::GEOM_KEY_POLYGON] = $polygon;
                return $geometry;
            }

            $circle = NotamCircleGeometryParser::tryParseCircleFromMessageVariant1($icaoApiNotam->all);
            if ($circle) {
                $this->logger->debug("circle geometry v1 in message found: " . $circle->center->toString(",") . " radius: " . $circle->radius->toString());

                $geometry->circle = $circle;

                return $geometry;
            }

            $circle = NotamCircleGeometryParser::tryParseCircleFromMessageVariant2($icaoApiNotam->all);
            if ($circle) {
                $this->logger->debug("circle geometry v2 in message found: " . $circle->center->toString(",") . " radius: " . $circle->radius->toString());

                $geometry->circle = $circle;

                return $geometry;
            }

            $circle = NotamCircleGeometryParser::tryParseCircleFromMessageVariant3($icaoApiNotam->all);
            if ($circle) {
                $this->logger->debug("circle geometry v3 in message found: " . $circle->center->toString(",") . " radius: " . $circle->radius->toString());

                $geometry->circle = $circle;

                return $geometry;
            }
        }

        // no match
        return null;
    }


    private function getNotamDbExtent(RawNotam $notam, IcaoApiNotam $icaoApiNotam, ?array $locationExtent): ?string
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
        if ($locationExtent !== null && $locationExtent["type"] == "ad") {
            $this->logger->debug("using ad coordinates + 5nm as db extent");

            $pos = DbHelper::parseLonLatFromDbPoint($locationExtent["lonlat"]);
            $circle = new Circle2d($pos, Length::fromNm(5));
            $polygon = GeoHelper::getCircleExtent($circle);

            return DbHelper::getDbPolygonString($polygon);
        }


        // fir notam
        if ($locationExtent !== null && $locationExtent["type"] == "fir") {
            $this->logger->debug("using fir polygon geometry as db extent");

            return "ST_GeomFromText('" . $locationExtent["polygon"] . "')";
        }


        // no extent found
        $this->logger->debug("no geometry found as db extent");

        return null;
    }


    // detect polygon in notam text: 463447N0062121E, 341640N0992240W, 1st: without coordinates in brackets, 2nd: including coordinates in brackets
    // e.g. ... 472401N0083320E 472315N0082918E 471935N0083439E 472103N0083855E 472119N0083657E 472137N0083602E 472215N0083450E (CENTER POINT 472209N0083406E RADIUS 3.5 NM) ...
    private function tryParsePolygon(string $text): ?Ring2d
    {
        $regExp = "/" . NotamCoordinateParser::REGEXP_PART_COORDPAIR . "/im";

        // try without text in brackets
        $textNoBrackets = $this->getNonBracketText($text);
        $this->logger->debug("text: " . $text);
        $this->logger->debug("non bracket text: " . $textNoBrackets);

        $result = preg_match_all($regExp, $textNoBrackets, $matches, PREG_SET_ORDER);

        if ($result && count($matches) >= 3) {
            return self::getRingFromPolygonMatches($matches);
        }

        // try with text in brackets
        $result = preg_match_all($regExp, $text, $matches, PREG_SET_ORDER);
        if ($result && count($matches) >= 3) {
            return self::getRingFromPolygonMatches($matches);
        }

        // no match
        return null;
    }


    private function getRingFromPolygonMatches(array $matches): Ring2d
    {
        $posList = [];
        foreach ($matches as $match) {
            $posList[] = NotamCoordinateParser::getLonLatFromGradMinSecStrings($match[1], $match[2], $match[3], $match[4], $match[5], $match[6], $match[7], $match[8]);
        }

        return new Ring2d($posList);
    }


    /**
     * @param RawNotam[] $notamList
     */
    private function tryFindMatchingAirspace(array &$notamList): void
    {
        // load intersecting airspaces from db
        $typeCatDict = array("RP" => ["PROHIBITED"], "RR" => ["RESTRICTED"], "RT" => ["RESTRICTED"], "RD" => ["DANGER", "PROHIBITED"], "RM" => ["DANGER", "RESTRICTED", "PROHIBITED"]);

        $queryParts = [];
        foreach ($notamList as $index => $notam) {
            $icaoApiNotam = IcaoApiNotam::fromJson($notam->notam);
            $notamType = $icaoApiNotam->getQcodeType();

            if ($notamType != null && array_key_exists($notamType, $typeCatDict) && $notam->dbExtent) {
                $query = "SELECT '" . $index . "' AS notamindex, asp.name AS name, asp.polygon AS polygon FROM openaip_airspace AS asp"
                    . " LEFT JOIN icao_fir AS fir ON fir.icao = '" . $notam->icao . "'"
                    . " WHERE ST_INTERSECTS(" . $notam->dbExtent . ", asp.extent) AND asp.category IN('" . join("','", $typeCatDict[$notamType]) . "')"
                    . " AND (ST_INTERSECTS(asp.extent, fir.polygon) OR fir.icao IS NULL)";

                $queryParts[] = $query;
            } else {
                $this->logger->debug("no matching airspace type for notam type '" . $notamType . "'");
                $this->logger->debug("or db extent is null: '" . $notam->dbExtent . "'");
            }
        }

        if (count($queryParts) == 0) {
            return;
        }

        $query = join(" UNION ", $queryParts);
        $result = $this->dbService->execMultiResultQuery($query, "error searching airspace");

        if ($result->getNumRows() == 0) {
            $this->logger->debug("no intersecting airspaces found");
            return;
        } else {
            $this->logger->debug($result->getNumRows() . " intersecting airspaces found");
        }


        // try to find name of airspace in notam text
        while ($rs = $result->fetch_assoc()) {
            $index = intval($rs["notamindex"]);
            $notam = &$notamList[$index];
            $icaoApiNotam = IcaoApiNotam::fromJson($notam->notam);

            if ($this->isAreaNameMatch($rs["name"], $icaoApiNotam->message)) {
                $top = $notam->geometry?->top ?? NULL;
                $bottom = $notam->geometry?->bottom ?? NULL;
                $polygon = self::convertDbPolygonToArray($rs["polygon"]);

                if (!isset($notam->airspaceGeometry))
                    $notam->airspaceGeometry = [];

                $notam->airspaceGeometry[] = array(self::GEOM_KEY_POLYGON => $polygon, self::GEOM_KEY_TOP => $top, self::GEOM_KEY_BOTTOM => $bottom);
            }
        }

        foreach ($notamList as &$notam) {
            if (isset($notam->airspaceGeometry) && count($notam->airspaceGeometry) > 0) {
                if (count($notam->airspaceGeometry) == 1) {
                    $notam->geometry = new RawNotamGeometry(
                        null,
                        $notam->airspaceGeometry[0]->polygon,
                        null,
                        $notam->airspaceGeometry[0]->top,
                        $notam->airspaceGeometry[0]->bottom
                    );
                    $notam->dbExtent = DbHelper::getDbPolygonString($notam->airspaceGeometry[0][self::GEOM_KEY_POLYGON]);
                } else {
                    $multipolygon = [];
                    foreach ($notam->airspaceGeometry as $asGeom)
                        $multipolygon[] = $asGeom[self::GEOM_KEY_POLYGON];

                    $notam->geometry = new RawNotamGeometry(
                        null,
                        null,
                        $multipolygon,
                        $notam->airspaceGeometry[0]->top,
                        $notam->airspaceGeometry[0]->bottom
                    );
                    $notam->dbExtent = DbHelper::getDbMultiPolygonString($multipolygon);
                }
            }
        }
    }


    private function isAreaNameMatch(string $airspaceName, string $notamText): bool
    {
        // try formats like LS-D15 Rossboden - Chur  or  LI R108/B-Colico bis (approx confine stato)
        $regExpAreaName = '/^([^\d]+\d+)[^\w\d]*([\w]{0,2}(?=)([^\w]|$))?/i';
        $result = preg_match($regExpAreaName, $airspaceName, $matches);

        if ($result && count($matches) > 0) {
            $areaName = $this->simplifyText($matches[1] . ($matches[2] ?? ''));
            $simpleNotamText = $this->simplifyText($notamText);

            $this->logger->debug("numeric airspace id found, search for '" . $areaName . "' in simplifyed notam text...");

            if (str_contains($simpleNotamText, $areaName)) {
                $this->logger->debug("...found");
                return true;
            } else {
                $this->logger->debug("...not found");
            }
        }


        // TODO: plain text area names
        // try format XXX YYY (124.245)
        $regExpAreaName = '/^([^\(\)\:]{4,})/i';
        $result = preg_match($regExpAreaName, $airspaceName, $matches);

        if ($result && count($matches) > 0) {
            $areaName = $this->simplifyText($matches[1]);
            $simpleNotamText = $this->simplifyText($notamText);

            $this->logger->debug("text airspace name found, search for '" . $areaName . "' in simplifyed notam text...");

            if (str_contains($simpleNotamText, $areaName)) {
                $this->logger->debug("...found");
                return true;
            } else {
                $this->logger->debug("...not found");
            }
        }

        return false;
    }


    // simplyfy text (remove all non-word and non-digits
    private function simplifyText(string $text): string
    {
        $pattern = "/[^\w\d]/im";
        return strtoupper(preg_replace($pattern, "", $text));
    }


    private function getNonBracketText(string $text): string
    {
        $pattern = "/\(.+?\)/ims";
        //$pattern = '/\(.*\)/im';
        return preg_replace($pattern, "", $text);
    }


    private static function checkNumeric($num)
    {
        if (!is_numeric($num))
            die("format error: '" . $num . "' is not numeric");

        return $num;
    }


    private static function convertDbPolygonToArray($polygonDbText): array
    {
        // prepare coordinates
        $polygon = [];
        $coord_pairs = explode(",", $polygonDbText);

        foreach ($coord_pairs as $latlon) {
            $coords = explode(" ", trim($latlon));
            $coords[0] = round(floatval($coords[0]), 4);
            $coords[1] = round(floatval($coords[1]), 4);
            $polygon[] = $coords;
        }

        return $polygon;
    }
}
