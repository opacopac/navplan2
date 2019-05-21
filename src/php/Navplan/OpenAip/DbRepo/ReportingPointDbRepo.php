<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use BadMethodCallException;
use Navplan\OpenAip\Domain\ReportingPoint;
use Navplan\OpenAip\RepoGateway\IReportingPointRepo;
use Navplan\Shared\DbHelper;
use Navplan\Shared\Domain\Polygon;
use Navplan\Shared\IDbResult;
use Navplan\Shared\IDbService;
use Navplan\Shared\StringNumberService;


class ReportingPointDbRepo implements IReportingPointRepo {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function searchByExtent(float $minLon, float $minLat, float $maxLon, float $maxLat): array {
        $extent = DbHelper::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $query = "SELECT * FROM reporting_points WHERE MBRIntersects(extent, " . $extent . ")";

        $result = $this->getDbService()->execMultiResultQuery($query, "error reading reporting points by extent");

        return self::readReportingPointFromResultList($result);
    }


    public function searchByPosition(float $lon, float $lat, float $maxRadius_deg, int $maxResults): array {
        $query = "SELECT *";
        $query .= " FROM reporting_points";
        $query .= " WHERE";
        $query .= "  latitude > " . ($lat - $maxRadius_deg);
        $query .= "  AND latitude < " . ($lat + $maxRadius_deg);
        $query .= "  AND longitude > " . ($lon - $maxRadius_deg);
        $query .= "  AND longitude < " . ($lon + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $lat . ") * (latitude - " . $lat . ") + (longitude - " . $lon . ") * (longitude - " . $lon . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->getDbService()->execMultiResultQuery($query,"error searching reporting points by position");

        return self::readReportingPointFromResultList($result);
    }


    public function searchByText(string $searchText, int $maxResults): array {
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
            !StringNumberService::isNullOrEmpty($rs, "latitude") ? floatval($rs["latitude"]) : NULL, // only for reporting points
            !StringNumberService::isNullOrEmpty($rs, "longitude") ? floatval($rs["longitude"]) : NULL, // only for reporting points
            !StringNumberService::isNullOrEmpty($rs, "polygon") ? Polygon::createFromString($rs["polygon"]) : NULL // only for reporting sectors
        );
    }
}
