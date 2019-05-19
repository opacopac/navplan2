<?php declare(strict_types=1);

namespace Navplan\Traffic;

use InvalidArgumentException;
use Navplan\Shared\IDbService;
use Navplan\Shared\IFileService;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\InvalidFormatException;

class TrafficServiceProcessor {
    /**
     * @param string $requestMethod
     * @param array|null $getVars
     * @param array|null $postVars
     * @param IDbService $dbService
     * @param IFileService $fileService
     * @param IHttpResponseService $httpService
     * @throws InvalidFormatException
     */
    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, IDbService $dbService, IFileService $fileService, IHttpResponseService $httpService)
    {
        switch ($requestMethod) {
            case 'GET':
                $action = isset($getVars["action"]) ? $getVars["action"] : NULL;
                switch ($action) {
                    case "readogntraffic":
                        OgnTraffic::readTraffic($getVars, $fileService, $dbService, $httpService);
                        break;
                    case "readadsbextraffic":
                        AdsbexTraffic::readTraffic($getVars, $fileService, $httpService);
                        break;
                    default:
                        self::throwInvalidArgumentError();
                }
                break;
            case 'POST':
                $action = isset($postVars["action"]) ? $postVars["action"] : NULL;
                switch ($action) {
                    case "readacdetails":
                        TrafficDetails::getDetails($postVars, $dbService, $httpService);
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
