<?php declare(strict_types=1);

namespace Navplan\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\MultiRing2d;
use Navplan\Notam\Domain\Model\RawNotam;
use Navplan\Notam\Domain\Model\RawNotamGeometry;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;
use Navplan\System\Domain\Service\ILoggingService;


class NotamAirspaceParser implements INotamAirspaceParser
{
    // Geometry array keys
    const string GEOM_KEY_POLYGON = 'polygon';
    const string GEOM_KEY_TOP = 'top';
    const string GEOM_KEY_BOTTOM = 'bottom';


    public function __construct(
        private readonly ILoggingService $logger,
        private readonly IDbService $dbService,
    )
    {
    }


    /**
     * @param RawNotam[] $notamList
     */
    public function tryFindMatchingAirspace(array &$notamList): void
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
                    foreach ($notam->airspaceGeometry as $asGeom) {
                        $multipolygon[] = $asGeom->polygon;
                    }

                    $notam->geometry = new RawNotamGeometry(
                        null,
                        null,
                        new MultiRing2d($multipolygon),
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


    // simplify text (remove all non-word and non-digits
    private function simplifyText(string $text): string
    {
        $pattern = "/[^\w\d]/im";
        return strtoupper(preg_replace($pattern, "", $text));
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
