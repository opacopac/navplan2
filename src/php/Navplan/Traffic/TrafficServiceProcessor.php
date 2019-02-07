<?php declare(strict_types=1);

namespace Navplan\Traffic;

use InvalidArgumentException;
use Navplan\Shared\IDbService;
use Navplan\Shared\IFileService;

require_once __DIR__ . "/../NavplanHelper.php";


class TrafficServiceProcessor {
    /***
     * @param string $requestMethod
     * @param array|null $getVars
     * @param array|null $postVars
     * @param IDbService $dbService
     * @param IFileService $fileService
     * @throws \Navplan\Shared\InvalidFormatException
     */
    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, IDbService $dbService, IFileService $fileService)
    {
        switch ($requestMethod) {
            case 'GET':
                switch ($getVars["action"]) {
                    case "readogntraffic":
                        OgnTraffic::readTraffic($getVars, $fileService, $dbService);
                        break;
                    case "readadsbextraffic":
                        AdsbexTraffic::readTraffic($getVars, $fileService);
                        break;
                    default:
                        self::throwInvalidArgumentError();
                }
                break;
            case 'POST':
                switch ($postVars["action"]) {
                    case "readacdetails":
                        TrafficDetails::getDetails($postVars, $dbService);
                        break;
                    default:
                        self::throwInvalidArgumentError();
                }
                break;
            default:
                self::throwInvalidArgumentError();
        }
    }


    private static function throwInvalidArgumentError() {
        throw new InvalidArgumentException("no or invalid action defined!");
    }
}
