<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use BadMethodCallException;
use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\OpenAip\DbModel\DbReportingPointConverter;
use Navplan\OpenAip\DomainService\IReportingPointRepo;
use Navplan\System\DomainModel\IDbResult;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbReportingPointRepo implements IReportingPointRepo {
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
            $reportingPoint[] = DbReportingPointConverter::fromDbResult($rs);
        }

        return $reportingPoint;
    }
}
