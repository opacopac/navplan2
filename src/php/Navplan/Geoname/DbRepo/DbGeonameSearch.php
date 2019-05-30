<?php declare(strict_types=1);

namespace Navplan\Geoname\DbRepo;

use Navplan\Geometry\Domain\Position2d;
use Navplan\Geoname\UseCase\IGeonameSearch;
use Navplan\Shared\IDbResult;
use Navplan\Shared\IDbService;


class DbGeonameSearch implements IGeonameSearch {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
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

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching geonames by position");

        return $this->readGeonamesFromResultList($result, true);
    }


    public function searchByText(string $searchText, int $maxResults): array {
        $searchText = $this->getDbService()->escapeString($searchText);
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

        $result = $this->getDbService()->execMultiResultQuery($query, "error searching geonames by text");

        return self::readGeonamesFromResultList($result, true);
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


    // TODO: move to business layer
    private function readGeonamesFromResultList(IDbResult $result, bool $renameDuplicates): array {
        $geonames = [];

        while ($rs = $result->fetch_assoc()) {
            $geonames[] = DbGeoname::fromDbResult($rs);
        }

        if ($renameDuplicates) {
            $duplicateIdx = self::findDuplicates($geonames);

            for ($i = 0; $i < count($geonames); $i++) {
                if (in_array($i, $duplicateIdx["admin1idx"]) && $geonames[$i]->admin2)
                    $geonames[$i]->searchresultname = $geonames[$i]->name . " (" . $geonames[$i]->country . ", " . $geonames[$i]->admin1 . ", " . $geonames[$i]->admin2 . ")";
                elseif (in_array($i, $duplicateIdx["nameidx"]) && $geonames[$i]->admin1)
                    $geonames[$i]->searchresultname = $geonames[$i]->name . " (" . $geonames[$i]->country . ", " . $geonames[$i]->admin1 . ")";
                else
                    $geonames[$i]->searchresultname = $geonames[$i]->name . " (" . $geonames[$i]->country . ")";
            }
        } else {
            for ($i = 0; $i < count($geonames); $i++) {
                $geonames[$i]->searchresultname = $geonames[$i]->name;
            }
        }

        return $geonames;
    }


    private function findDuplicates(array $geonames): array {
        $duplicateNameIdx = array();
        $duplicateAdmin1Idx = array();

        // check for duplicate names
        for ($i = 0; $i < count($geonames) - 1; $i++) {
            for ($j = $i + 1; $j < count($geonames); $j++) {
                if ($i == $j) {
                    continue;
                }

                if ($geonames[$i]->name == $geonames[$j]->name) {
                    if ($geonames[$i]->admin1 == $geonames[$j]->admin1) {
                        array_push($duplicateAdmin1Idx, $i);
                        array_push($duplicateAdmin1Idx, $j);
                    } else {
                        array_push($duplicateNameIdx, $i);
                        array_push($duplicateNameIdx, $j);
                    }
                }
            }
        }

        return array("nameidx" => $duplicateNameIdx, "admin1idx" => $duplicateAdmin1Idx);
    }
}
