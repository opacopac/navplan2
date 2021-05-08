<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\Geometry\DomainModel\Extent;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\OpenAip\DbModel\DbNavaidConverter;
use Navplan\OpenAip\DomainService\INavaidRepo;
use Navplan\System\DomainModel\IDbResult;
use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\DbHelper;


class DbNavaidRepo implements INavaidRepo {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function searchByExtent(Extent $extent, int $zoom): array {
        $extent = DbHelper::getDbExtentPolygon2($extent);
        $query = "SELECT *";
        $query .= " FROM openaip_navaids2";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(lonlat, " . $extent . ")";
        $query .= "    AND";
        $query .= "  zoommin <= " . $zoom;

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching navaids by extent");

        return $this->readNavaidFromResultList($result);
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        $query = "SELECT *";
        $query .= " FROM openaip_navaids";
        $query .= " WHERE";
        $query .= "  latitude > " . ($position->latitude - $maxRadius_deg);
        $query .= "  AND latitude < " . ($position->latitude + $maxRadius_deg);
        $query .= "  AND longitude > " . ($position->longitude - $maxRadius_deg);
        $query .= "  AND longitude < " . ($position->longitude + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $position->latitude . ") * (latitude - " . $position->latitude .
            ") + (longitude - " . $position->longitude . ") * (longitude - " . $position->longitude . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->getDbService()->execMultiResultQuery($query,"error searching navaids by position");

        return $this->readNavaidFromResultList($result);
    }


    public function searchByText(string $searchText, int $maxResults): array {
        $searchText = $this->getDbService()->escapeString($searchText);
        $query = "SELECT *";
        $query .= " FROM openaip_navaids";
        $query .= " WHERE";
        $query .= "   kuerzel LIKE '" . $searchText . "%'";
        $query .= "   OR name LIKE '" . $searchText . "%'";
        $query .= " ORDER BY CASE WHEN country = 'CH' THEN 1 ELSE 2 END ASC, kuerzel ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching navaids by text");

        return $this->readNavaidFromResultList($result);
    }


    private function readNavaidFromResultList(IDbResult $result): array {
        $navaids = [];
        while ($rs = $result->fetch_assoc()) {
            $navaids[] = DbNavaidConverter::fromDbResult($rs);
        }

        return $navaids;
    }
}
