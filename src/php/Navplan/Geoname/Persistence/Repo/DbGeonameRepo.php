<?php declare(strict_types=1);

namespace Navplan\Geoname\Persistence\Repo;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\Geoname\Domain\Service\IGeonameRepo;
use Navplan\Geoname\Persistence\Model\DbGeonameConverter;
use Navplan\System\Domain\Model\IDbResult;
use Navplan\System\Domain\Service\IDbService;


class DbGeonameRepo implements IGeonameRepo {
    public function __construct(private IDbService $dbService) {
    }


    public function searchByPosition(Position2d $position, float $maxRadius_deg, int $maxResults): array {
        $query = "SELECT geo.*,";
        $query .= "  cod1.name AS admin1_name,";
        $query .= "  cod2.name AS admin2_name";
        $query .= " FROM geonames AS geo";
        $query .= "  LEFT JOIN geonames_admin1codes AS cod1";
        $query .= "    ON cod1.geonames_key = CONCAT(geo.country_code, '.', geo.admin1_code)";
        $query .= "  LEFT JOIN geonames_admin2codes AS cod2";
        $query .= "    ON cod2.geonames_key = CONCAT(geo.country_code, '.', geo.admin1_code, '.' , geo.admin2_code)";
        $query .= " WHERE";
        $query .= "  latitude > " . ($position->latitude - $maxRadius_deg);
        $query .= "  AND latitude < " . ($position->latitude + $maxRadius_deg);
        $query .= "  AND longitude > " . ($position->longitude - $maxRadius_deg);
        $query .= "  AND longitude < " . ($position->longitude + $maxRadius_deg);
//        $query .= "  AND " . self::getGeonamesFilterQuery();
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $position->latitude . ") * (latitude - " . $position->latitude . ") + (longitude - " . $position->longitude . ") * (longitude - " . $position->longitude . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching geonames by position");

        return $this->readGeonamesFromResultList($result);
    }


    public function searchByText(string $searchText, int $maxResults): array {
        $searchText = $this->dbService->escapeString($searchText);
        $query = "SELECT geo.*,";
        $query .= "  cod1.name AS admin1_name,";
        $query .= "  cod2.name AS admin2_name";
        $query .= " FROM geonames AS geo";
        $query .= "  LEFT JOIN geonames_admin1codes AS cod1";
        $query .= "    ON cod1.geonames_key = CONCAT(geo.country_code, '.', geo.admin1_code)";
        $query .= "  LEFT JOIN geonames_admin2codes AS cod2";
        $query .= "    ON cod2.geonames_key = CONCAT(geo.country_code, '.', geo.admin1_code, '.' , geo.admin2_code)";
        $query .= " WHERE";
        $query .= "   MATCH (geo.name, geo.alternatenames) AGAINST ('" . $searchText . "*' IN BOOLEAN MODE)";
//        $query .= "   AND " . self::getGeonamesFilterQuery();
        $query .= " ORDER BY CASE WHEN geo.country_code = 'CH' THEN 1 ELSE 2 END ASC, geo.population DESC";
        $query .= " LIMIT " . $maxResults;

        $result = $this->dbService->execMultiResultQuery($query, "error searching geonames by text");

        return $this->readGeonamesFromResultList($result);
    }


    private static function getGeonamesFilterQuery()
    {
        $query  = "((feature_class = 'P')"; // populated place
        $query .= " OR (feature_class = 'T')"; // any terrain
        $query .= " OR (feature_class = 'H'))"; // any waterbody
        /*	$query .= " OR (feature_class = 'S')"; // any spot
            $query .= " OR (feature_class = 'T' AND feature_code = 'MT')"; // mountain
            $query .= " OR (feature_class = 'T' AND feature_code = 'MTS')"; // mountains
            $query .= " OR (feature_class = 'T' AND feature_code = 'PK')"; // peak
            $query .= " OR (feature_class = 'T' AND feature_code = 'PK')"; // peaks
            $query .= " OR (feature_class = 'T' AND feature_code = 'PASS')"; // pass
            $query .= " OR (feature_class = 'H' AND feature_code = 'LK'))"; // see*/

        return $query;
    }


    private function readGeonamesFromResultList(IDbResult $result): array {
        $geonames = [];

        while ($row = $result->fetch_assoc()) {
            $geonames[] = DbGeonameConverter::fromDbRow($row);
        }

        return $geonames;
    }
}
