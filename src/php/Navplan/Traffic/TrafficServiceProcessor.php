<?php declare(strict_types=1);

namespace Navplan\Traffic;

use InvalidArgumentException;
use Navplan\Shared\IDbService;
use Navplan\Shared\IFileService;

require_once __DIR__ . "/../NavplanHelper.php";


class TrafficServiceProcessor {
    /***
     * @param array $getVars
     * @param IDbService $dbService
     * @param IFileService $fileService
     * @throws \Navplan\Shared\DbException
     * @throws \Navplan\Shared\InvalidFormatException
     */
    public static function processRequest(array $getVars, IDbService $dbService, IFileService $fileService)
    {
        switch ($getVars["action"]) {
            case "readogntraffic":
                $conn = $dbService->openDb();
                ReadOgnTraffic::readTraffic($getVars, $fileService, $conn);
                $dbService->closeDb();
                break;
            case "readadsbextraffic":
                ReadAdsbexTraffic::readTraffic($getVars, $fileService);
                break;
            default:
                throw new InvalidArgumentException("no or invalid action defined!");
        }
    }
}
