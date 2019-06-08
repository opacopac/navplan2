<?php declare(strict_types=1);

namespace Navplan\Traffic;

use Navplan\Db\UseCase\IDbService;
use Navplan\System\UseCase\IFileService;
use Navplan\System\UseCase\IHttpService;
use Navplan\Shared\RequestResponseHelper;
use Navplan\Shared\StringNumberService;


class OgnTraffic
{
    const TMP_FILE_BASE_PATH = __DIR__ . "/../../../tmp/";


    /**
     * @param array $args
     * @param IFileService $fileService
     * @param IDbService $dbService
     * @param IHttpService $httpService
     * @throws \Navplan\Shared\InvalidFormatException
     */
    public static function readTraffic(array $args, IFileService $fileService, IDbService $dbService, IHttpService $httpService) {
        $dbService->openDb();

        $minLat = floatval(StringNumberService::checkNumeric(StringNumberService::parseStringOrNull($args, "minlat")));
        $maxLat = floatval(StringNumberService::checkNumeric(StringNumberService::parseStringOrNull($args, "maxlat")));
        $minLon = floatval(StringNumberService::checkNumeric(StringNumberService::parseStringOrNull($args, "minlon")));
        $maxLon = floatval(StringNumberService::checkNumeric(StringNumberService::parseStringOrNull($args, "maxlon")));
        $maxAgeSec = intval(StringNumberService::checkNumeric(StringNumberService::parseStringOrNull($args, "maxagesec")));
        $sessionId = intval(StringNumberService::checkNumeric(StringNumberService::parseStringOrNull($args, "sessionid")));
        $waitDataSec = isset($args["waitDataSec"]) ? intval(StringNumberService::checkNumeric($args["waitDataSec"])) : 0;
        $callback = isset($args["callback"]) ? StringNumberService::checkString($args["callback"], 1, 50) : NULL;

        self::writeFilterFile($sessionId, $minLon, $minLat, $maxLon, $maxLat, $fileService);
        self::checkStartListener($sessionId, $fileService);
        self::conditionalWait($waitDataSec);
        $acList = self::readTrafficListFromFiles($sessionId, $minLon, $minLat, $maxLon, $maxLat, $maxAgeSec, $fileService);
        self::sortPositionTimestamps($acList);

        RequestResponseHelper::sendArrayResponseWithRoot($httpService,"aclist", $acList, $callback);

        $dbService->closeDb();
    }


    private static function writeFilterFile(int $sessionId, float $minLon, float $minLat, float $maxLon, float $maxLat, IFileService $fileService)
    {
        $filterFile = self::TMP_FILE_BASE_PATH . 'ognlistener_' . $sessionId . '.filter';
        $filter = "a/" . $maxLat . "/" . $minLon . "/" . $minLat . "/" . $maxLon;
        $fileService->filePutContents($filterFile, $filter, LOCK_EX);
    }


    private static function checkStartListener(int $sessionId, IFileService $fileService)
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


    private static function readTrafficListFromFiles(int $sessionId, float $minLon, float $minLat, float $maxLon, float $maxLat, int $maxAgeSec, IFileService $fileService): array
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
                if ($line === FALSE)
                    continue;

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
            usort($acList[$ac["id"]]["positions"], array('Navplan\Traffic\OgnTraffic', 'timecompare'));
    }


    public static function timecompare($posa, $posb)
    {
        return strcmp($posa["time"], $posb["time"]);
    }
}
