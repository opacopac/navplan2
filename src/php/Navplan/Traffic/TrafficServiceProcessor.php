<?php declare(strict_types=1);

namespace Navplan\Traffic;

use \InvalidArgumentException;
use Navplan\Shared\DbConnection;

require_once __DIR__ . "/../NavplanHelper.php";


class TrafficServiceProcessor {
    /***
     * @param array $getVars
     * @param DbConnection $conn
     * @throws \Navplan\Shared\DbException
     * @throws \Navplan\Shared\InvalidFormatException
     */
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
                throw new InvalidArgumentException("no or invalid action defined!");
        }
    }
}
