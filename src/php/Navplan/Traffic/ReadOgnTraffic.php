<?php namespace Navplan\Traffic;


use Navplan\Shared\DbConnection;
use Navplan\Shared\DbService;
use Navplan\Shared\StringNumberService;

class ReadOgnTraffic
{
    const TMP_FILE_BASE_PATH = __DIR__ . "/../../../tmp/";


    /**
     * @param DbConnection $conn
     * @param array $args
     * @throws \Navplan\Shared\DbException
     */
    public static function readTraffic(DbConnection $conn, array $args)
    {
        $minLat = StringNumberService::checkNumeric($args["minlat"]);
        $maxLat = StringNumberService::checkNumeric($args["maxlat"]);
        $minLon = StringNumberService::checkNumeric($args["minlon"]);
        $maxLon = StringNumberService::checkNumeric($args["maxlon"]);
        $maxAgeSec = StringNumberService::checkNumeric($args["maxagesec"]);
        $sessionId = StringNumberService::checkNumeric($args["sessionid"]);
        $waitDataSec = $args["waitDataSec"] ? StringNumberService::checkNumeric($args["waitDataSec"]) : 0;
        $callback = $args["callback"] ? StringNumberService::checkString($args["callback"], 1, 50) : NULL;

        self::writeFilterFile($sessionId, $minLon, $minLat, $maxLon, $maxLat);
        self::checkStartListener($sessionId);
        self::conditionalWait($waitDataSec);
        $acList = self::readTrafficListFromFiles($sessionId, $minLon, $minLat, $maxLon, $maxLat, $maxAgeSec);
        self::sortPositionTimestamps($acList);
        $acList = self::getAircraftDetails($conn, $acList);
        self::sendResponse($acList, $callback);
    }


    private static function writeFilterFile(int $sessionId, float $minLon, float $minLat, float $maxLon, float $maxLat)
    {
        $filterFile = self::TMP_FILE_BASE_PATH . 'ognlistener_' . $sessionId . '.filter';
        $filter = "a/" . $maxLat . "/" . $minLon . "/" . $minLat . "/" . $maxLon;
        file_put_contents($filterFile, $filter, LOCK_EX);
    }


    private static function checkStartListener(int $sessionId)
    {
        $lockFile = self::TMP_FILE_BASE_PATH . 'ognlistener_' . $sessionId . '.lock';

        // start listener if lockfile not found
        if (!file_exists($lockFile))
        {
            shell_exec("cd ../../ognlistener; ./start_listener " . $sessionId);
            sleep(1);
        }
    }


    private static function conditionalWait(?int $waitDataSec)
    {
        if ($waitDataSec !== NULL && $waitDataSec > 0)
            sleep($waitDataSec);
    }


    private static function readTrafficListFromFiles(int $sessionId, float $minLon, float $minLat, float $maxLon, float $maxLat, int $maxAgeSec): array
    {
        $aclist = array();
        $dumpFiles[0] = self::TMP_FILE_BASE_PATH . 'ognlistener_' . $sessionId . '.dump0';
        $dumpFiles[1] = self::TMP_FILE_BASE_PATH . 'ognlistener_' . $sessionId . '.dump1';

        foreach ($dumpFiles as $dumpFile)
        {
            if (!file_exists($dumpFile))
                continue;

            // open dumpfile
            $file = fopen($dumpFile, "r");

            // iterate trough all entries in dumpfile
            while (!feof($file))
            {
                // parse single line
                $line = fgets($file);
                $msg = json_decode($line, true);

                // skip line if out of lat/lon/time
                if ($msg["latitude"] > $maxLat || $msg["latitude"] < $minLat)
                    continue;

                if ($msg["longitude"] > $maxLon || $msg["longitude"] < $minLon)
                    continue;

                if (gmmktime() - strtotime($msg["time"] . " UTC") > $maxAgeSec)
                    continue;

                // add new aircrafts to list
                if (!$aclist[$msg["id"]]) {
                    $ac = array("id" => $msg["id"], "addresstype" => $msg["addresstype"], "actype" => $msg["actype"], "positions" => array());
                    $aclist[$msg["id"]] = $ac;
                }

                // get position data
                $position = array("time" => $msg["time"], "latitude" => $msg["latitude"], "longitude" => $msg["longitude"], "altitude" => round($msg["altitude"]), "receiver" => $msg["receiver"]);

                // filter identical positions/times
                $poscount = count($aclist[$msg["id"]]["positions"]);
                if ($poscount > 1) {
                    $lastpos = $aclist[$msg["id"]]["positions"][$poscount - 1];

                    // skip identical times
                    if ($lastpos["time"] == $position["time"])
                        continue;

                    // skip identical positions
                    if ($lastpos["latitude"] == $position["latitude"] && $lastpos["longitude"] == $position["longitude"])
                        continue;
                }

                array_push($aclist[$msg["id"]]["positions"], $position);
            }
        }

        return $aclist;
    }


    private static function sortPositionTimestamps(array &$acList)
    {
        foreach ($acList as $ac)
            usort($acList[$ac["id"]]["positions"], array('Navplan\Traffic\ReadOgnTraffic', 'timecompare'));
    }


    public static function timecompare($posa, $posb)
    {
        return strcmp($posa["time"], $posb["time"]);
    }


    /**
     * @param DbConnection $conn
     * @param array $acList
     * @return array
     * @throws \Navplan\Shared\DbException
     */
    private static function getAircraftDetails(DbConnection $conn, array $acList): array
    {
        // get and escape all icao hex ac identifiers
        $icaoList = array();

        foreach ($acList as $ac)
        {
            $icaohex = StringNumberService::checkEscapeString($conn, strtoupper($ac["id"]), 1, 6);
            array_push($icaoList, $icaohex);
        }

        // exec query
        $query = "SELECT * FROM lfr_ch WHERE icaohex IN ('" . join("','", $icaoList) . "')";
        $result = DbService::execMultiResultQuery($conn, $query);

        while ($rs = $result->fetch_array(MYSQLI_ASSOC))
        {
            $ac = $acList[$rs["icaohex"]];

            if ($ac) {
                $ac["registration"] = $rs["registration"];
                $ac["acModel"] = $rs["acModel"];
                $ac["aircraftCategoryId"] = $rs["aircraftCategoryId"];

                $acList[$rs["icaohex"]] = $ac;
            }
        }

        return $acList;
    }


    private static function sendResponse(array $acList, ?string $callback)
    {
        $json = json_encode(array("aclist" => $acList), JSON_NUMERIC_CHECK);

        if ($callback) {
            echo $callback . "(";
            echo $json;
            echo ")";
        } else {
            echo $json;
        }
    }
}
