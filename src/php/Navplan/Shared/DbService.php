<?php namespace Navplan\Shared;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;


class DbService
{
    public static function openDb(): DbConnection
    {
        global $db_host, $db_user, $db_pw, $db_name;

        // open db connection
        $conn = new mysqli($db_host, $db_user, $db_pw, $db_name);
        $conn->set_charset("utf8");

        return new DbConnection($conn);
    }


    /**
     * @param DbConnection $conn
     * @param string $query
     * @param bool $allowZeroResults
     * @param string $errorMessage
     * @return DbResult
     * @throws DbException
     */
    public static function execSingleResultQuery(DbConnection $conn, string $query, bool $allowZeroResults = true, string $errorMessage = "error executing single result query"): DbResult {
        $result = $conn->query($query);
        if ($result === FALSE
            || $result->getNumRows() > 1
            || (!$allowZeroResults && $result->getNumRows() == 0)) {
            throw new DbException($errorMessage, $conn->getError(), $query);
        }

        return $result;
    }


    /**
     * @param DbConnection $conn
     * @param string $query
     * @param string $errorMessage
     * @return DbResult
     * @throws DbException
     */
    public static function execMultiResultQuery(DbConnection $conn, string $query, string $errorMessage = "error executing multi result query"): DbResult {
        $result = $conn->query($query);
        if ($result === FALSE)
            throw new DbException($errorMessage, $conn->getError(), $query);

        return $result;
    }


    /**
     * @param DbConnection $conn
     * @param string $query
     * @param string $errorMessage
     * @return bool
     * @throws DbException
     */
    public static function execCUDQuery(DbConnection $conn, string $query, string $errorMessage = "error executing query"): bool {
        $result = $conn->query($query);
        if ($result === FALSE)
            throw new DbException($errorMessage, $conn->getError(), $query);

        return $result;
    }


    public static function getDbTimeString(int $timestamp): string
    {
        return date("Y-m-d H:i:s", $timestamp);
    }


    public static function getDbExtentPolygon(float $minLon, float $minLat, float $maxLon, float $maxLat): string
    {
        return "ST_GeomFromText('POLYGON((" . $minLon . " " . $minLat . "," . $maxLon . " " . $minLat . "," . $maxLon . " " . $maxLat . "," . $minLon . " " . $maxLat . "," . $minLon . " " . $minLat . "))')";
    }


    public static function getDbPolygonString(array $lonLatList): string
    {
        $lonLatStrings = [];

        foreach ($lonLatList as $lonLat)
            $lonLatStrings[] = join(" ", $lonLat);

        if ($lonLatStrings[0] != $lonLatStrings[count($lonLatStrings) - 1]) // close polygon if necessary
            $lonLatStrings[] = $lonLatStrings[0];

        $polyString = "ST_GeomFromText('POLYGON((" . join(",", $lonLatStrings) . "))')";

        return $polyString;
    }


    public static function getDbMultiPolygonString(array $polygonList): string
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
    public static function parseLonLatFromDbPoint(string $dbPointString): array
    {
        $decimalRegExpPart = '([\-\+]?\d+\.?\d*)';
        $dbPointRegexp = '/POINT\(\s*' . $decimalRegExpPart . '\s+' . $decimalRegExpPart . '\s*\)/im';

        $result = preg_match($dbPointRegexp, $dbPointString, $matches);

        if (!$result)
            return null;

        $lonLat = [floatval($matches[1]), floatval($matches[2])];

        return $lonLat;
    }


    public static function getDbPointStringFromLonLat(array $lonLat): string
    {
        return "ST_GeomFromText('POINT(" . $lonLat[0] . " " . $lonLat[1] . ")')";
    }
}
