<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use BadMethodCallException;
use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\Domain\ReportingPoint;
use Navplan\OpenAip\IRepo\IReportingPointSearch;
use Navplan\Shared\DbHelper;
use Navplan\Geometry\Domain\Ring2d;
use Navplan\Shared\IDbResult;
use Navplan\Shared\IDbService;
use Navplan\Shared\StringNumberService;


class DbReportingPointSearch implements IReportingPointSearch {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function searchByExtent(Extent $extent): array {
        $extentPoly = DbHelper::getDbExtentPolygon2($extent);
        $query = "SELECT * FROM reporting_points WHERE MBRIntersects(extent, " . $extentPoly . ")";

        $result = $this->getDbService()->execMultiResultQuery($query, "error reading reporting points by extent");

        return self::readReportingPointFromResultList($result);
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        $query = "SELECT *";
        $query .= " FROM reporting_points";
        $query .= " WHERE";
        $query .= "  latitude > " . ($position->latitude - $maxRadius_deg);
        $query .= "  AND latitude < " . ($position->latitude + $maxRadius_deg);
        $query .= "  AND longitude > " . ($position->longitude - $maxRadius_deg);
        $query .= "  AND longitude < " . ($position->longitude + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $position->latitude . ") * (latitude - " . $position->latitude .
            ") + (longitude - " . $position->longitude . ") * (longitude - " . $position->longitude . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->getDbService()->execMultiResultQuery($query,"error searching reporting points by position");

        return self::readReportingPointFromResultList($result);
    }


    public function searchByText(string $searchText, int $maxResults): array {
        $searchText = $this->getDbService()->escapeString($searchText);
        $query = "SELECT * FROM reporting_points";
        $query .= " WHERE";
        $query .= "   airport_icao LIKE '" . $searchText . "%'";
        $query .= " ORDER BY airport_icao ASC, name ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching reporting points by text");

        return self::readReportingPointFromResultList($result);
    }


    public function searchByIcao($icaoList): array {
        throw new BadMethodCallException("not implemented!");
    }


    private function readReportingPointFromResultList(IDbResult $result): array {
        $reportingPoint = [];
        while ($rs = $result->fetch_assoc()) {
            $reportingPoint[] = self::readReportingPointFromResult($rs);
        }

        return $reportingPoint;
    }


    private function readReportingPointFromResult(array $rs): ReportingPoint {
        return new ReportingPoint(
            intval($rs["id"]),
            $rs["type"],
            $rs["airport_icao"],
            $rs["name"],
            !StringNumberService::isNullOrEmpty($rs, "heli") ? boolval($rs["heli"]) : FALSE,
            !StringNumberService::isNullOrEmpty($rs, "inbd_comp") ? boolval($rs["inbd_comp"]) : FALSE,
            !StringNumberService::isNullOrEmpty($rs, "outbd_comp") ? boolval($rs["outbd_comp"]): FALSE,
            !StringNumberService::isNullOrEmpty($rs, "min_ft") ? intval($rs["min_ft"]) : NULL,
            !StringNumberService::isNullOrEmpty($rs, "max_ft") ? intval($rs["max_ft"]) : NULL,
            $this->readPos2dFromResult($rs), // only for reporting points
            !StringNumberService::isNullOrEmpty($rs, "polygon") ? Ring2d::createFromString($rs["polygon"]) : NULL // only for reporting sectors
        );
    }


    private function readPos2dFromResult(array $rs): ?Position2d {
        if (StringNumberService::isNullOrEmpty($rs, "latitude") || StringNumberService::isNullOrEmpty($rs, "longitude")) {
            return NULL;
        }

        return new Position2d(
            floatval($rs["longitude"]),
            floatval($rs["latitude"])
        );
    }
}
