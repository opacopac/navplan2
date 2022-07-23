<?php declare(strict_types=1);

namespace Navplan\Enroute\DbService;

use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Enroute\DbModel\DbNavaidConverter;
use Navplan\Enroute\DomainService\INavaidRepo;
use Navplan\System\DomainModel\IDbResult;
use Navplan\System\DomainService\IDbService;
use Navplan\System\DomainService\ILoggingService;
use Navplan\System\MySqlDb\DbHelper;
use Throwable;


class DbNavaidRepo implements INavaidRepo {
    public function __construct(
        private IDbService $dbService,
        private ILoggingService $loggingService
    ) {
    }


    public function searchByExtent(Extent2d $extent, int $zoom): array {
        $extent = DbHelper::getDbExtentPolygon2($extent);
        $query = "SELECT *";
        $query .= " FROM openaip_navaids2";
        $query .= " WHERE";
        $query .= "  ST_INTERSECTS(lonlat, " . $extent . ")";
        /*$query .= "    AND";
        $query .= "  zoommin <= " . $zoom;*/

        $result = $this->dbService->execMultiResultQuery($query, "error searching navaids by extent");

        return $this->readNavaidFromResultList($result);
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        $query = "SELECT *";
        $query .= " FROM openaip_navaids2";
        $query .= " WHERE";
        $query .= "  latitude > " . ($position->latitude - $maxRadius_deg);
        $query .= "  AND latitude < " . ($position->latitude + $maxRadius_deg);
        $query .= "  AND longitude > " . ($position->longitude - $maxRadius_deg);
        $query .= "  AND longitude < " . ($position->longitude + $maxRadius_deg);
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $position->latitude . ") * (latitude - " . $position->latitude .
            ") + (longitude - " . $position->longitude . ") * (longitude - " . $position->longitude . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query,"error searching navaids by position");

        return $this->readNavaidFromResultList($result);
    }


    public function searchByText(string $searchText, int $maxResults): array {
        $searchText = $this->dbService->escapeString($searchText);
        $query = "SELECT *";
        $query .= " FROM openaip_navaids2";
        $query .= " WHERE";
        $query .= "   kuerzel LIKE '" . $searchText . "%'";
        $query .= "   OR name LIKE '" . $searchText . "%'";
        $query .= " ORDER BY CASE WHEN country = 'CH' THEN 1 ELSE 2 END ASC, kuerzel ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching navaids by text");

        return $this->readNavaidFromResultList($result);
    }


    public function insertAll(array $navaids): void {
        $statement = DbNavaidConverter::prepareInsertStatement($this->dbService);

        foreach ($navaids as $navaid) {
            try {
                DbNavaidConverter::bindInsertStatement($navaid, $statement);
                $statement->execute();
            } catch (Throwable $ex) {
                $this->loggingService->error("error inserting navaid '" . $navaid->name . "'");
                throw $ex;
            }
        }
    }


    public function deleteAll(): bool {
        $query = "TRUNCATE TABLE " . DbNavaidConverter::TABLE_NAME;

        return $this->dbService->execCUDQuery($query);
    }


    private function readNavaidFromResultList(IDbResult $result): array {
        $navaids = [];
        while ($row = $result->fetch_assoc()) {
            $navaids[] = DbNavaidConverter::fromDbRow($row);
        }

        return $navaids;
    }
}
