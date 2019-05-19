<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\OpenAip\Domain\Navaid;
use Navplan\OpenAip\RepoGateway\INavaidRepo;
use Navplan\Shared\DbHelper;
use Navplan\Shared\IDbResult;
use Navplan\Shared\IDbService;


class NavaidDbRepo implements INavaidRepo {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function searchByExtent(float $minLon, float $minLat, float $maxLon, float $maxLat, int $zoom): array {
        $extent = DbHelper::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $query = "SELECT *";
        $query .= " FROM openaip_navaids2";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(lonlat, " . $extent . ")";
        $query .= "    AND";
        $query .= "  zoommin <= " . $zoom;

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching navaids by extent");

        return $this->readNavaidFromResultList($result);
    }


    public function searchByPosition(float $lon, float $lat, float $maxRadius_deg, int $maxResults): array {
        $query = "SELECT *";
        $query .= " FROM openaip_navaids";
        $query .= " WHERE";
        $query .= "  latitude > " . ($lat - $maxRadius_deg);
        $query .= "  AND latitude < " . ($lat + $maxRadius_deg);
        $query .= "  AND longitude > " . ($lon - $maxRadius_deg);
        $query .= "  AND longitude < " . ($lon + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $lat . ") * (latitude - " . $lat . ") + (longitude - " . $lon . ") * (longitude - " . $lon . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->getDbService()->execMultiResultQuery($query,"error searching navaids by position");

        return $this->readNavaidFromResultList($result);
    }


    public function searchByText(string $searchText, int $maxResults): array {
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
            $navaids[] = self::readNavaidFromResult($rs);
        }

        return $navaids;
    }


    private function readNavaidFromResult(array $rs): Navaid {
        $unit = "MHz";
        if ($rs["type"] == "NDB")
            $unit = "kHz";

        return new Navaid(
            intval($rs["id"]),
            $rs["type"],
            $rs["kuerzel"],
            $rs["name"],
            floatval($rs["latitude"]),
            floatval($rs["longitude"]),
            floatval($rs["elevation"]),
            $rs["frequency"],
            $unit,
            floatval($rs["declination"]),
            boolval($rs["truenorth"])
        );
    }
}
