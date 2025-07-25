<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Service;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\GeoHelper;
use Navplan\Notam\Domain\Model\Notam;
use Navplan\Notam\Domain\Service\INotamRepo;
use Navplan\Notam\Persistence\Model\DbNotamConverter;
use Navplan\System\Db\Domain\Model\IDbResult;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbNotamRepo implements INotamRepo {
    const NOTAM_MAX_BOTTOM_FL = 195;
    const MIN_PIXEL_NOTAMAREA_DIAMETER = 30;  // TODO
    const MIN_PIXEL_COORDINATE_RESOLUTION = 2;  // TODO


    public function __construct(public IDbService $dbService) {
    }


    public function searchByExtent(Extent2d $extent, int $zoom, int $minNotamTimestamp, int $maxNotamTimestamp): array {
        $dbExtent = DbHelper::getDbPolygonString($extent);
        $pixelResolutionDeg = GeoHelper::calcDegPerPixelByZoom($zoom); // TODO
        $minDiameterDeg = $pixelResolutionDeg * self::MIN_PIXEL_NOTAMAREA_DIAMETER;
        // get firs & ads within extent
        $icaoList = $this->loadIcaoListByExtent($extent); // TODO: why?

        // load notams by icao
        $query = "SELECT ntm.id, ntm.notam AS notam, geo.geometry AS geometry, ST_AsText(geo.extent) AS extent"
            . "   FROM icao_notam AS ntm"
            . "    INNER JOIN icao_notam_geometry2 AS geo ON geo.icao_notam_id = ntm.id"
            . "   WHERE icao IN ('" .  join("','", $icaoList) . "')"
            . "    AND startdate <= '" . DbHelper::getDbUtcTimeString($maxNotamTimestamp) . "'"
            . "    AND enddate >= '" . DbHelper::getDbUtcTimeString($minNotamTimestamp) . "'"
            . "    AND ST_INTERSECTS(geo.extent, " . $dbExtent . ")"
            . "    AND geo.diameter > " . $minDiameterDeg
            . "    AND (" . $zoom . " >= geo.zoommin AND " . $zoom . "<= geo.zoommax)";

        $result = $this->dbService->execMultiResultQuery($query, "error reading notams");
        $areaNotamList = self::readNotamFromResultList($result);
        $areaNotamList = self::removeNonAreaNotams($areaNotamList);

        return $areaNotamList;
    }


    public function searchByPosition(Position2d $position, int $minNotamTimestamp, int $maxNotamTimestamp): array {
        $query = "SELECT ntm.id, ntm.notam AS notam"
            . "   FROM icao_notam AS ntm"
            . "    INNER JOIN icao_notam_geometry2 geo ON geo.icao_notam_id = ntm.id "
            . "   WHERE"
            . "    ntm.startdate <= '" . DbHelper::getDbUtcTimeString($maxNotamTimestamp) . "'"
            . "    AND ntm.enddate >= '" . DbHelper::getDbUtcTimeString($minNotamTimestamp) . "'"
            . "    AND (geo.zoommax = 255 OR geo.zoommax IS NULL)"
            . "    AND ST_INTERSECTS(geo.extent,". DbHelper::getDbPointString($position) . ")"
            . "   ORDER BY ntm.startdate DESC";

        $result = $this->dbService->execMultiResultQuery($query, "error searching notams");

        return $this->readNotamFromResultList($result);
    }


    public function searchByIcao(string $airportIcao, int $minNotamTimestamp, int $maxNotamTimestamp): array {
        $query = "SELECT ntm.id, ntm.notam AS notam"
            . "   FROM icao_notam AS ntm"
            . "   WHERE"
            . "    ntm.icao IN (" . $this->dbService->escapeAndQuoteString($airportIcao) . ")"
            . "    AND ntm.startdate <= '" . DbHelper::getDbUtcTimeString($maxNotamTimestamp) . "'"
            . "    AND ntm.enddate >= '" . DbHelper::getDbUtcTimeString($minNotamTimestamp) . "'"
            . "   ORDER BY ntm.startdate DESC";

        $result = $this->dbService->execMultiResultQuery($query, "error searching notams");

        return $this->readNotamFromResultList($result);
    }


    private function loadIcaoListByExtent(Extent2d $extent): array {
        $extentSql = DbHelper::getDbPolygonString($extent);
        $query = "SELECT DISTINCT icao FROM icao_fir WHERE ST_INTERSECTS(polygon, " . $extentSql . ") AND icao <> ''";
        $query .= " UNION ";
        $query .= "SELECT DISTINCT icao FROM openaip_airports WHERE ST_INTERSECTS(lonlat, " . $extentSql . ") AND icao <> ''";

        $result = $this->dbService->execMultiResultQuery($query, "error reading fir/ad icao list");

        $icaoList = [];
        while ($row = $result->fetch_assoc())
            $icaoList[] = $row["icao"];

        return $icaoList;
    }


    private function removeNonAreaNotams($notamList) {
        $areaNotamList = [];

        /* @var $notam Notam */
        foreach ($notamList as $notam) {
            if ($notam->isAreaNotam())
                $areaNotamList[] = $notam;
        }

        return $areaNotamList;
    }


    private function readNotamFromResultList(IDbResult $result): array {
        $notams = [];
        while ($row = $result->fetch_assoc()) {
            $notam = DbNotamConverter::fromDbRow($row);

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
}
