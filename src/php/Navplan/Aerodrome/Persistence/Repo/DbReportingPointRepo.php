<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Persistence\Repo;

use BadMethodCallException;
use Navplan\Aerodrome\Domain\Service\IReportingPointRepo;
use Navplan\Aerodrome\Persistence\Model\DbReportingPointConverter;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\System\DomainModel\IDbResult;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbReportingPointRepo implements IReportingPointRepo {
    public function __construct(private IDbService $dbService) {
    }


    public function searchByExtent(Extent2d $extent): array {
        $extentPoly = DbHelper::getDbExtentPolygon2($extent);
        $query = "SELECT * FROM reporting_points WHERE MBRIntersects(extent, " . $extentPoly . ")";

        $result = $this->dbService->execMultiResultQuery($query, "error reading reporting points by extent");

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

        $result = $this->dbService->execMultiResultQuery($query,"error searching reporting points by position");

        return self::readReportingPointFromResultList($result);
    }


    public function searchByText(string $searchText, int $maxResults): array {
        $searchText = $this->dbService->escapeString($searchText);
        $query = "SELECT * FROM reporting_points";
        $query .= " WHERE";
        $query .= "   airport_icao LIKE '" . $searchText . "%'";
        $query .= " ORDER BY airport_icao ASC, name ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching reporting points by text");

        return self::readReportingPointFromResultList($result);
    }


    public function searchByIcao($icaoList): array {
        throw new BadMethodCallException("not implemented!");
    }


    private function readReportingPointFromResultList(IDbResult $result): array {
        $reportingPoint = [];
        while ($row = $result->fetch_assoc()) {
            $reportingPoint[] = DbReportingPointConverter::fromDbRow($row);
        }

        return $reportingPoint;
    }
}
