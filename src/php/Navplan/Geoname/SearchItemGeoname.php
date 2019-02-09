<?php declare(strict_types=1);

namespace Navplan\Geoname;

require_once __DIR__ . "/../../terrainHelper.php"; // TODO

use Navplan\Shared\IDbResult;
use Navplan\Shared\IDbService;
use TerrainHelper;


class SearchItemGeoname {
    public static function searchByPosition(IDbService $dbService, float $lon, float $lat, float $maxRadius_deg, int $maxResults) {
        $query = "SELECT geo.*,";
        $query .= "  cod1.name AS admin1_name,";
        $query .= "  cod2.name AS admin2_name";
        $query .= " FROM geonames AS geo";
        $query .= "  LEFT JOIN geonames_admin1codes AS cod1";
        $query .= "    ON cod1.geonames_key = CONCAT(geo.country_code, '.', geo.admin1_code)";
        $query .= "  LEFT JOIN geonames_admin2codes AS cod2";
        $query .= "    ON cod2.geonames_key = CONCAT(geo.country_code, '.', geo.admin1_code, '.' , geo.admin2_code)";
        $query .= " WHERE";
        $query .= "  latitude > " . ($lat - $maxRadius_deg);
        $query .= "  AND latitude < " . ($lat + $maxRadius_deg);
        $query .= "  AND longitude > " . ($lon - $maxRadius_deg);
        $query .= "  AND longitude < " . ($lon + $maxRadius_deg);
//        $query .= "  AND " . self::getGeonamesFilterQuery();
        $query .= " ORDER BY";
        $query .= "  ((latitude - " . $lat . ") * (latitude - " . $lat . ") + (longitude - " . $lon . ") * (longitude - " . $lon . ")) ASC";
        $query .= " LIMIT " . $maxResults;

        $result = $dbService->execMultiResultQuery($query, "error searching geonames by position");
        $terrainHelper = new TerrainHelper();

        return self::readGeonamesFromResultList($result, $terrainHelper, true, null);
    }


    public static function searchByText(IDbService $dbService, string $searchText, int $maxResults) {
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

        $result = $dbService->execMultiResultQuery($query, "error searching geonames by text");
        $terrainHelper = new TerrainHelper();

        return self::readGeonamesFromResultList($result, $terrainHelper, true, null);
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


    private static function readGeonamesFromResultList(IDbResult $result, TerrainHelper $terrainHelper, bool $renameDuplicates, array $lonLat) {
        $geonames = [];

        while ($rs = $result->fetch_assoc()) {
            $geonames[] = self::readGeonameFromResult($rs, $terrainHelper);
        }

        if ($renameDuplicates) {
            $duplicateIdx = self::findDuplicates($geonames);

            for ($i = 0; $i < count($geonames); $i++) {
                if (in_array($i, $duplicateIdx["admin1idx"]) && $geonames[$i]["admin2"])
                    $geonames[$i]["searchresultname"] = $geonames[$i]["name"] . " (" . $geonames[$i]["country"] . ", " . $geonames[$i]["admin1"] . ", " . $geonames[$i]["admin2"] . ")";
                elseif (in_array($i, $duplicateIdx["nameidx"]) && $geonames[$i]["admin1"])
                    $geonames[$i]["searchresultname"] = $geonames[$i]["name"] . " (" . $geonames[$i]["country"] . ", " . $geonames[$i]["admin1"] . ")";
                else
                    $geonames[$i]["searchresultname"] = $geonames[$i]["name"] . " (" . $geonames[$i]["country"] . ")";
            }
        } else {
            for ($i = 0; $i < count($geonames); $i++) {
                $geonames[$i]["searchresultname"] = $geonames[$i]["name"];
            }
        }

        /*if ($lonLat) { // add click coordinates as last point
            $clickPoint = array(
                type => "coordinates",
                id => null,
                name => round($lonLat[1], 4) . " " . round($lonLat[0], 4),
                wpname => round($lonLat[1], 4) . " " . round($lonLat[0], 4),
                country => "",
                admin1 => "",
                admin2 => "",
                frequency => "",
                callsign => "",
                airport_icao => "",
                latitude => $lonLat[1],
                longitude => $lonLat[0],
                elevation => $terrainHelper->getElevationMeters($lonLat)
            );

            $geonames[] = $clickPoint;
        }*/

        return $geonames;
    }


    private static function findDuplicates(array $geonames) {
        $duplicateNameIdx = array();
        $duplicateAdmin1Idx = array();

        // check for duplicate names
        for ($i = 0; $i < count($geonames) - 1; $i++)
        {
            for ($j = $i + 1; $j < count($geonames); $j++)
            {
                if ($i == $j)
                    continue;

                if ($geonames[$i]["name"] == $geonames[$j]["name"])
                {
                    if ($geonames[$i]["admin1"] == $geonames[$j]["admin1"])
                    {
                        array_push($duplicateAdmin1Idx, $i);
                        array_push($duplicateAdmin1Idx, $j);
                    }
                    else
                    {
                        array_push($duplicateNameIdx, $i);
                        array_push($duplicateNameIdx, $j);
                    }
                }
            }
        }

        return array("nameidx" => $duplicateNameIdx, "admin1idx" => $duplicateAdmin1Idx);
    }


    private static function readGeonameFromResult(array $rs, TerrainHelper $terrainHelper) {
        return array(
            "id" => $rs["geonameid"],
            "name" => $rs["name"],
            "searchresultname" => $rs["searchresultname"],
            "feature_class" => $rs["feature_class"],
            "feature_code" => $rs["feature_code"],
            "country" => $rs["country_code"] ? $rs["country_code"] : "",
            "admin1" => $rs["admin1_name"] ? $rs["admin1_name"] : "",
            "admin2" => $rs["admin2_name"] ? $rs["admin2_name"] : "",
            "population" => $rs["population"],
            "latitude" => $rs["latitude"],
            "longitude" => $rs["longitude"],
            "elevation" => $rs["elevation"] ? $rs["elevation"] : $terrainHelper->getElevationMeters([$rs["longitude"], $rs["latitude"]])
        );
    }
}
