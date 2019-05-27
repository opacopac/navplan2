<?php declare(strict_types=1);

namespace Navplan\Notam\DbRepo;

use Navplan\Geometry\Domain\Altitude;
use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\Geometry\Domain\Circle2d;
use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\IGeometry2d;
use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;
use Navplan\Geometry\Domain\MultiRing2d;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Geometry\Domain\Ring2d;
use Navplan\Notam\Domain\Notam;
use Navplan\Notam\Domain\NotamGeometry;
use Navplan\Notam\IRepo\INotamRepo;
use Navplan\Shared\DbHelper;
use Navplan\Shared\GeoService;
use Navplan\Shared\IDbResult;
use Navplan\Shared\IDbService;
use Navplan\Shared\StringNumberService;


class NotamDbRepo implements INotamRepo {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    const NOTAM_MAX_BOTTOM_FL = 195;
    const MIN_PIXEL_NOTAMAREA_DIAMETER = 30;  // TODO
    const MIN_PIXEL_COORDINATE_RESOLUTION = 2;  // TODO


    public function searchByExtent(Extent $extent, int $zoom, int $minNotamTimestamp, int $maxNotamTimestamp): array {
        $dbExtent = DbHelper::getDbExtentPolygon2($extent);
        $pixelResolutionDeg = GeoService::calcDegPerPixelByZoom($zoom); // TODO
        $minDiameterDeg = $pixelResolutionDeg * self::MIN_PIXEL_NOTAMAREA_DIAMETER;
        // get firs & ads within extent
        $icaoList = $this->loadIcaoListByExtent($extent);

        // load notams by icao
        $query = "SELECT ntm.notam AS notam, geo.geometry AS geometry, ST_AsText(geo.extent) AS extent"
            . "   FROM icao_notam AS ntm"
            . "    INNER JOIN icao_notam_geometry AS geo ON geo.icao_notam_id = ntm.id"
            . "   WHERE icao IN ('" .  join("','", $icaoList) . "')"
            . "    AND startdate <= '" . DbHelper::getDbTimeString($maxNotamTimestamp) . "'"
            . "    AND enddate >= '" . DbHelper::getDbTimeString($minNotamTimestamp) . "'"
            . "  ST_INTERSECTS(air.extent, " . $dbExtent . ")"
            . "    AND"
            . "  air.diameter > " . $minDiameterDeg
            . "    AND"
            . "  (" . $zoom . " >= det.zoommin AND " . $zoom . "<= det.zoommax)";


        $result = $this->getDbService()->execMultiResultQuery($query, "error reading notams");
        $areaNotamList = self::readNotamFromResultList($result);
        $areaNotamList = self::removeNonAreaNotams($areaNotamList);

        return $areaNotamList;
    }


    public function searchByPosition(Position2d $position, int $minNotamTimestamp, int $maxNotamTimestamp, int $maxResults): array {
        $query = "SELECT ntm.notam AS notam"
            . "   FROM icao_notam AS ntm"
            . "    INNER JOIN icao_notam_geometry geo ON geo.icao_notam_id = ntm.id "
            . "    INNER JOIN icao_fir fir ON fir.statecode = ntm.country"
            . "    LEFT JOIN icao_fir fir2 ON fir2.icao = ntm.icao"
            . "   WHERE ST_INTERSECTS(geo.extent,". DbHelper::getDbPointStringFromLonLat([$position->longitude, $position->latitude]) . ")"
            . "    AND ntm.startdate <= '" . DbHelper::getDbTimeString($maxNotamTimestamp) . "'"
            . "    AND ntm.enddate >= '" . DbHelper::getDbTimeString($minNotamTimestamp) . "'"
            . "    AND (ST_INTERSECTS(fir.polygon,". DbHelper::getDbPointStringFromLonLat([$position->longitude, $position->latitude]) . "))" //" OR (fir2.icao IS NULL AND geo.geometry IS NOT NULL))"
            . "   ORDER BY ntm.startdate DESC"
            . "   LIMIT " . $maxResults;

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching notams");

        return $this->readNotamFromResultList($result);
    }


    public function searchByIcao(array $icaoList, int $minNotamTimestamp, int $maxNotamTimestamp): array {
        $query = "SELECT ntm.notam AS notam"
            . "   FROM icao_notam AS ntm"
            . "    INNER JOIN icao_notam_geometry2 geo ON geo.icao_notam_id = ntm.id"
            . "   WHERE"
            . "    ntm.icao IN ('" . join("','", $icaoList) . "')"
            . "    AND ntm.startdate <= '" . DbHelper::getDbTimeString($maxNotamTimestamp) . "'"
            . "    AND ntm.enddate >= '" . DbHelper::getDbTimeString($minNotamTimestamp) . "'"
            . "   ORDER BY ntm.startdate DESC";

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching notams");

        return $this->readNotamFromResultList($result);
    }


    private function loadIcaoListByExtent(Extent $extent): array {
        $extentSql = DbHelper::getDbExtentPolygon2($extent);
        $query = "SELECT DISTINCT icao FROM icao_fir WHERE ST_INTERSECTS(polygon, " . $extentSql . ") AND icao <> ''";
        $query .= " UNION ";
        $query .= "SELECT DISTINCT icao FROM openaip_airports WHERE ST_INTERSECTS(lonlat, " . $extentSql . ") AND icao <> ''";

        $result = $this->getDbService()->execMultiResultQuery($query, "error reading fir/ad icao list");

        $icaoList = [];
        while ($rs = $result->fetch_assoc())
            $icaoList[] = $rs["icao"];

        return $icaoList;
    }


    private function removeNonAreaNotams($notamList) {
        $areaNotamList = [];

        foreach ($notamList as $notam) {
            if ($this->isAreaNotam($notam))
                $areaNotamList[] = $notam;
        }

        return $areaNotamList;
    }


    private function isAreaNotam(Notam $notam) {
        if ($notam->isIcao) {
            $qtype = strtoupper(substr($notam->qcode, 0, 1));

            if ($qtype == "W" || $qtype == "R") // || $qtype == "X")
                return true;
        } else {
            if ($notam->type == "airspace")
                return true;
        }

        return false;
    }


    private function readNotamFromResultList(IDbResult $result): array {
        $notams = [];
        while ($rs = $result->fetch_assoc()) {
            $notam = $this->readNotamFromResult($rs);

            // filter by max FL195
            /*if ($notam->geometry && $notam->geometry["bottom"] >= NOTAM_MAX_BOTTOM_FL)
                continue;*/

            // filter by notam type (no KKKK)
            if ($notam->qcode == "KKKK")
                continue;

            $notams[] = $notam;
        }

        return $notams;
    }


    private function readNotamFromResult(array $rs): Notam {
        $notam = json_decode($rs["notam"], true);
        // $notam["geometry"] = json_decode($rs["geometry"], JSON_NUMERIC_CHECK);

        return new Notam(
            intval($rs["id"]),
            $notam["StateCode"],
            $notam["StateName"],
            $notam["id"],
            StringNumberService::parseStringOrNull($notam, "entity"),
            StringNumberService::parseStringOrNull($notam, "status"),
            StringNumberService::parseStringOrNull($notam, "Qcode"),
            StringNumberService::parseStringOrNull($notam, "Area"),
            StringNumberService::parseStringOrNull($notam, "SubArea"),
            StringNumberService::parseStringOrNull($notam, "Condition"),
            StringNumberService::parseStringOrNull($notam, "Subject"),
            StringNumberService::parseStringOrNull($notam, "Modifier"),
            StringNumberService::parseStringOrNull($notam, "message"),
            $notam["startdate"],
            $notam["enddate"],
            $notam["all"],
            $notam["location"],
            boolval($notam["isICAO"]),
            $notam["Created"],
            $notam["key"],
            $notam["type"],
            $this->readNotamGeometryFromResult($rs)
        );
    }


    private function readNotamGeometryFromResult(array $rs): ?NotamGeometry {
        if (!isset($rs["geometry"])) {
            return NULL;
        }

        $geometry = json_decode($rs["geometry"], true);
        $altBottom = $this->readAltBottomFromGeometry($geometry);
        $altTop = $this->readAltTopFromResult($geometry);
        $shape = $this->readShapeFromResult($geometry);

        if ($shape === NULL) {
            return NULL;
        }

        return new NotamGeometry(
            $shape,
            $altBottom,
            $altTop
        );
    }


    private function readAltBottomFromGeometry(array $geometry): ?Altitude {
        if (isset($geometry["bottom"])) {
            return new Altitude(
                $geometry["bottom"],
                AltitudeUnit::FL,
                AltitudeReference::STD
            );
        }

        return NULL;
    }


    private function readAltTopFromResult(array $geometry): ?Altitude {
        if (isset($geometry["top"])) {
            return new Altitude(
                $geometry["top"],
                AltitudeUnit::FL,
                AltitudeReference::STD
            );
        }

        return NULL;
    }


    private function readShapeFromResult(array $geometry): ?IGeometry2d {
        if (isset($geometry["polygon"])) {
            return Ring2d::createFromArray($geometry["polygon"]);
        } else if (isset($geometry["multipolygon"])) {
            return MultiRing2d::createFromArray($geometry["multipolygon"]);
        } else if (isset($geometry["center"]) && isset($geometry["radius"])) {
            return new Circle2d(
                Position2d::createFromArray($geometry["center"]),
                new Length($geometry["radius"], LengthUnit::NM)
            );
        }

        return NULL;
    }
}
