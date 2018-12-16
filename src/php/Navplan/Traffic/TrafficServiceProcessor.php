<?php namespace Navplan\Traffic;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbConnection;


class TrafficServiceProcessor {
    public static function processRequest(array $getVars, DbConnection $conn)
    {


        switch ($getVars["action"]) {
            case "readogntraffic":
                ReadOgnTraffic::readTraffic($conn, $getVars);
                break;
            case "readadsbextraffic":
                ReadAdsbexTraffic::readTraffic($getVars);
                break;
            default:
                die("no or invalid action defined!");
        }
    }
}
