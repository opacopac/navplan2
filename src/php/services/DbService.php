<?php
require_once __DIR__ . "/../config.php";


class DbService
{
    public static function openDb()
    {
        global $db_host, $db_user, $db_pw, $db_name;

        // open db connection
        $conn = new mysqli($db_host, $db_user, $db_pw, $db_name);
        $conn->set_charset("utf8");

        return $conn;
    }


    public static function execSingleResultQuery($conn, $query, $allowZeroResults = true, $errorMessage = "error executing single result query") {
        $result = $conn->query($query);
        if ($result === FALSE  || $result->num_rows > 1 || (!$allowZeroResults && $result->num_rows == 0))
            die($errorMessage . ": " . $conn->error . " query:" . $query);

        return $result;
    }


    public static function execMultiResultQuery($conn, $query, $errorMessage = "error executing multi result query") {
        $result = $conn->query($query);
        if ($result === FALSE)
            die($errorMessage . ": " . $conn->error . " query:" . $query);

        return $result;
    }


    public static function getDbTimeString($timestamp)
    {
        return date("Y-m-d H:i:s", $timestamp);
    }


    public static function getDbExtentPolygon($minLon, $minLat, $maxLon, $maxLat)
    {
        return "ST_GeomFromText('POLYGON((" . $minLon . " " . $minLat . "," . $maxLon . " " . $minLat . "," . $maxLon . " " . $maxLat . "," . $minLon . " " . $maxLat . "," . $minLon . " " . $minLat . "))')";
    }


    public static function getDbPolygonString($lonLatList)
    {
        $lonLatStrings = [];

        foreach ($lonLatList as $lonLat)
            $lonLatStrings[] = join(" ", $lonLat);

        if ($lonLatStrings[0] != $lonLatStrings[count($lonLatStrings) - 1]) // close polygon if necessary
            $lonLatStrings[] = $lonLatStrings[0];

        $polyString = "ST_GeomFromText('POLYGON((" . join(",", $lonLatStrings) . "))')";

        return $polyString;
    }


    public static function getDbMultiPolygonString($polygonList)
    {
        $polyStrings = [];
        foreach ($polygonList as $polygon) {
            $lonLatStrings = [];
            foreach ($polygon as $lonLat)
                $lonLatStrings[] = join(" ", $lonLat);

            if ($lonLatStrings[0] != $lonLatStrings[count($lonLatStrings) - 1]) // close polygon if necessary
                $lonLatStrings[] = $lonLatStrings[0];

            $polyStrings[] = "((" . join(",", $lonLatStrings) . "))";
        }

        $multiPolyString = "ST_GeomFromText('MULTIPOLYGON(" . join(",", $polyStrings) . ")')";

        return $multiPolyString;
    }


    // retrieve lon lat from the format: POINT(-76.867 38.8108)
    public static function parseLonLatFromDbPoint($dbPointString)
    {
        $decimalRegExpPart = '([\-\+]?\d+\.?\d*)';
        $dbPointRegexp = '/POINT\(\s*' . $decimalRegExpPart . '\s+' . $decimalRegExpPart . '\s*\)/im';

        $result = preg_match($dbPointRegexp, $dbPointString, $matches);

        if (!$result)
            return null;

        $lonLat = [floatval($matches[1]), floatval($matches[2])];

        return $lonLat;
    }


    public static function getDbPointStringFromLonLat($lonLat)
    {
        return "ST_GeomFromText('POINT(" . $lonLat[0] . " " . $lonLat[1] . ")')";
    }
}
