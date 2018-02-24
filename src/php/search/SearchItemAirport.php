<?php
include_once __DIR__ . "/../services/DbService.php";


class SearchItemAirport {
    public static function searchByExtent($conn, $minLon, $minLat, $maxLon, $maxLat, $email = null) {
        $extent = DbService::getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat);
        $query  = "SELECT *";
        $query .= " FROM openaip_airports";
        $query .= " WHERE MBRIntersects(lonlat, " . $extent . ")";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading airports");
        $airports = self::readAirportFromResultList($result);
        self::loadAirportSubItems($conn, $airports, $email);

        return $airports;
    }


    public static function searchById($conn, $id) {
        // TODO: Implement SearchByReference() method.
    }

    public static function searchByText($conn, $searchText, $maxResults, $email) {
        $query = "SELECT *";
        $query .= " FROM openaip_airports";
        $query .= " WHERE";
        $query .= "   icao LIKE '" . $searchText . "%'";
        $query .= "   OR name LIKE '" . $searchText . "%'";
        $query .= " ORDER BY";
        $query .= "   CASE WHEN country = 'CH' THEN 1 ELSE 2 END ASC,";
        $query .= "   CASE WHEN ISNULL(icao) OR icao = '' THEN 2 ELSE 1 END ASC,";
        $query .= "   CASE WHEN type = 'INTL_APT' THEN 1";
        $query .= "        WHEN type = 'APT' OR type = 'AF_CIVIL' OR type = 'AF_MIL_CIVIL' OR type = 'AF_WATER' OR type = 'AD_MIL' THEN 2";
        $query .= "        WHEN type = 'GLIDING' OR type = 'LIGHT_AIRCRAFT' THEN 3";
        $query .= "        WHEN type = 'HELI_CIVIL' OR type = 'HELI_MIL' THEN 4";
        $query .= "        ELSE 5 END ASC,";
        $query .= "   icao ASC";
        $query .= " LIMIT " . $maxResults;

        $result = DbService::execMultiResultQuery($conn, $query, "error searching airports");
        $airports = self::readAirportFromResultList($result);
        self::loadAirportSubItems($conn, $airports, $email);

        return $airports;
    }


    private static function loadAirportSubItems($conn, &$airports, $email) {
        if (count($airports) == 0)
            return;

        $apIds = [];
        $apIcaos = [];
        foreach ($airports as $ap) {
            $apIds[] = $ap["id"];
            $apIcaos[] = $ap["icao"];
        }

        $apIdList = join(",", $apIds);
        $apIcaoList = "'" . join("','", $apIcaos) . "'";

        self::loadAirportRunways($conn, $airports, $apIdList);
        self::loadAirportRadios($conn, $airports, $apIdList);
        self::loadAirportChars($conn, $airports, $apIcaoList, $email);
        self::loadAirportWebcams($conn, $airports, $apIcaoList);
        self::loadAirportFeatures($conn, $airports, $apIcaoList);
    }


    private static function loadAirportRunways($conn, &$airports, $apIdList) {
        $query  = "SELECT *";
        $query .= " FROM openaip_runways";
        $query .= " WHERE operations = 'ACTIVE' AND airport_id IN (" . $apIdList . ")";
        $query .= " ORDER BY length DESC, surface ASC, id ASC";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading runways");

        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            foreach ($airports as &$ap) {
                if ($ap["id"] == $rs["airport_id"]) {
                    $ap["runways"][] = self::readAirportRunwayFromResult($rs);
                    break;
                }
            }
        }
    }


    private static function loadAirportRadios($conn, &$airports, $apIdList) {
        $query  = "SELECT *,";
        $query .= "  (CASE WHEN category = 'COMMUNICATION' THEN 1 WHEN category = 'OTHER' THEN 2 WHEN category = 'INFORMATION' THEN 3 ELSE 4 END) AS sortorder1,";
        $query .= "  (CASE WHEN type = 'TOWER' THEN 1 WHEN type = 'CTAF' THEN 2 WHEN type = 'OTHER' THEN 3 ELSE 4 END) AS sortorder2";
        $query .= " FROM openaip_radios";
        $query .= " WHERE airport_id IN (" . $apIdList . ")";
        $query .= " ORDER BY";
        $query .= "   sortorder1 ASC,";
        $query .= "   sortorder2 ASC,";
        $query .= "   frequency ASC";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading radios");

        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            foreach ($airports as &$ap) {
                if ($ap["id"] == $rs["airport_id"]) {
                    $ap["radios"][] = self::readAirportRadioFromResult($rs);
                    break;
                }
            }
        }
    }


    private static function loadAirportChars($conn, &$airports, $apIcaoList, $email) {
        $query = "SELECT *,";
        $query .= "  (CASE WHEN type LIKE 'AREA%' THEN 1 WHEN type LIKE 'VAC%' THEN 2 WHEN type LIKE 'AD INFO%' THEN 3 ELSE 4 END) AS sortorder1";
        $query .= " FROM ad_charts ";
        $query .= " WHERE airport_icao IN (" .  $apIcaoList . ")";

        // hack: show VFRM charts only in branch
        if (!$email && !isBranch())
            $query .= " AND source != 'VFRM' ";

        $query .= " ORDER BY";
        $query .= "   source ASC,";
        $query .= "   sortorder1 ASC,";
        $query .= "   type ASC";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading charts");

        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            foreach ($airports as &$ap) {
                if ($ap["icao"] == $rs["airport_icao"]) {
                    $ap["charts"][] = self::readAirportChartFromResult($rs);
                    break;
                }
            }
        }
    }


    private static function loadAirportWebcams($conn, &$airports, $apIcaoList) {
        $query  = "SELECT *";
        $query .= " FROM webcams";
        $query .= " WHERE airport_icao IN (" .  $apIcaoList . ")";
        $query .= " ORDER BY";
        $query .= "   name ASC";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading webcams");

        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            foreach ($airports as &$ap) {
                if ($ap["icao"] == $rs["airport_icao"]) {
                    $ap["webcams"][] = self::readAirportWebcamFromResult($rs);
                    break;
                }
            }
        }
    }


    private static function loadAirportFeatures($conn, &$airports, $apIcaoList) {
        $query  = "SELECT *";
        $query .= " FROM map_features";
        $query .= " WHERE airport_icao IN (" .  $apIcaoList . ")";
        $query .= " ORDER BY";
        $query .= "   type ASC,";
        $query .= "   name ASC";

        $result = DbService::execMultiResultQuery($conn, $query, "error reading map features");

        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            foreach ($airports as &$ap) {
                if ($ap["icao"] == $rs["airport_icao"]) {
                    $ap["mapfeatures"][] = self::readAirportFeatureFromResult($rs);
                    break;
                }
            }
        }
    }


    private static function readAirportFromResultList($result) {
        $airports = [];

        while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            $airports[] = self::readAirportFromResult($rs);
        }

        return $airports;
    }


    private static function readAirportFromResult($rs) {
        $ap = array(
            id => $rs["id"],
            type => $rs["type"],
            name => $rs["name"],
            icao => $rs["icao"],
            country => $rs["country"],
            latitude => reduceDegAccuracy($rs["latitude"], "AIRPORT"),
            longitude => reduceDegAccuracy($rs["longitude"], "AIRPORT"),
            elevation => $rs["elevation"],
            runways => [],
            radios => [],
            webcams => [],
            charts => [],
            mapfeatures => []
        );

        $ap["runways"] = [];
        $ap["radios"] = [];
        $ap["charts"] = [];
        $ap["webcams"] = [];
        $ap["mapfeatures"] = [];

        return $ap;
    }



    private static function readAirportRunwayFromResult($rs) {
        return array(
            name => $rs["name"],
            surface => $rs["surface"],
            length => $rs["length"],
            width => $rs["width"],
            direction1 => $rs["direction1"],
            direction2 => $rs["direction2"],
            tora1 => $rs["tora1"],
            tora2 => $rs["tora2"],
            lda1 => $rs["lda1"],
            lda2 => $rs["lda2"],
            papi1 => $rs["papi1"],
            papi2 => $rs["papi2"]
        );
    }


    private static function readAirportRadioFromResult($rs) {
        return array(
            category => $rs["category"],
            frequency => $rs["frequency"],
            type => $rs["type"],
            typespec => $rs["typespec"],
            description => $rs["description"]
        );
    }


    private static function readAirportChartFromResult($rs) {
        return array(
            id => $rs["id"],
            source => $rs["source"],
            type => $rs["type"],
            filename => $rs["filename"],
            mercator_n => $rs["mercator_n"],
            mercator_s => $rs["mercator_s"],
            mercator_e => $rs["mercator_e"],
            mercator_w => $rs["mercator_w"]
        );
    }


    private static function readAirportWebcamFromResult($rs) {
        return array(
            name => $rs["name"],
            url => $rs["url"]
        );
    }


    private static function readAirportFeatureFromResult($rs) {
        return array(
            type => $rs["type"],
            name => $rs["name"]
        );
    }
}
