<?php declare(strict_types=1);

namespace Navplan\Notam\Persistence\Service;

use Navplan\Common\Domain\Model\Extent2d;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\GeoHelper;
use Navplan\Flightroute\Domain\Model\Flightroute;
use Navplan\Notam\Domain\Service\INotamRepo;
use Navplan\Notam\Persistence\Model\DbNotamConverter;
use Navplan\System\Db\Domain\Model\IDbResult;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\DbHelper;


class DbNotamRepo implements INotamRepo {
    const MIN_PIXEL_COORDINATE_RESOLUTION = 2;  // TODO


    public function __construct(public IDbService $dbService) {
    }


    public function searchByRoute(Flightroute $flightroute, Length $maxDistFromRoute, int $minNotamTimestamp, int $maxNotamTimestamp): array {
        $waypoints = $flightroute->getWaypointsInclAlternate();

        if (count($waypoints) === 0) {
            return [];
        }

        $posList = array_map(function ($wp) { return $wp->position; }, $waypoints);

        // Build lineboxes for each consecutive waypoint pair
        $lineBoxPolygons = [];
        if (count($posList) === 1) {
            // Single waypoint: create a box around the point
            $lineBoxPolygons[] = DbHelper::getDbPolygonString(GeoHelper::getPointBox($posList[0], $maxDistFromRoute));
        } else {
            // Multiple waypoints: create lineboxes for each segment
            for ($i = 0; $i < count($posList) - 1; $i++) {
                $ring2d = GeoHelper::getLineBox($posList[$i], $posList[$i + 1], $maxDistFromRoute);
                $lineBoxPolygons[] = DbHelper::getDbPolygonString($ring2d);
            }
        }

        // Build intersection condition for all lineboxes
        $intersectionConditions = [];
        foreach ($lineBoxPolygons as $polygon) {
            $intersectionConditions[] = "ST_INTERSECTS(geo.extent, " . $polygon . ")";
        }
        $intersectionClause = "(" . join(" OR ", $intersectionConditions) . ")";

        // Load NOTAMs intersecting any of the route segment lineboxes
        $query = "SELECT ntm.id, ntm.notam AS notam, geo.geometry AS geometry, ST_AsText(geo.extent) AS extent"
            . "   FROM icao_notam AS ntm"
            . "    INNER JOIN icao_notam_geometry2 AS geo ON geo.icao_notam_id = ntm.id"
            . "   WHERE startdate <= '" . DbHelper::getDbUtcTimeString($maxNotamTimestamp) . "'"
            . "    AND enddate >= '" . DbHelper::getDbUtcTimeString($minNotamTimestamp) . "'"
            . "    AND " . $intersectionClause
            . "   ORDER BY ntm.startdate DESC";

        $result = $this->dbService->execMultiResultQuery($query, "error reading notams by route");
        $notams = $this->readNotamFromResultList($result);

        return $notams;
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

