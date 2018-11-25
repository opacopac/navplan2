<?php namespace Navplan\Traffic;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbConnection;


class TrafficServiceProcessor {
    public static function processRequest(array $getVars, DbConnection $conn)
    {
        ReadOgnTraffic::readTraffic($conn, $getVars);
    }
}
