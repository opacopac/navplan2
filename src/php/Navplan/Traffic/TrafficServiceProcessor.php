<?php declare(strict_types=1);

namespace Navplan\Traffic;

use InvalidArgumentException;
use Navplan\Shared\RequestResponseHelper;
use Navplan\Traffic\Rest\RestReadTrafficRequest;
use Navplan\Traffic\Rest\RestTrafficListResponse;
use Navplan\Traffic\UseCase\ITrafficConfig;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic;
use Navplan\Traffic\UseCase\ReadOgnTraffic;


class TrafficServiceProcessor {
    public const REQUEST_METHOD_GET = "GET";
    public const REQUEST_METHOD_POST = "POST";
    public const ACTION_READ_OGN_TRAFFIC = "readogntraffic";
    public const ACTION_READ_ADSBEX_TRAFFIC = "readadsbextraffic";
    public const ACTION_READ_AC_DETAILS = "readacdetails";


    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, ITrafficConfig $config) {
        switch ($requestMethod) {
            case self::REQUEST_METHOD_GET:
                $action = isset($getVars["action"]) ? $getVars["action"] : NULL;
                switch ($action) {
                    case self::ACTION_READ_OGN_TRAFFIC:
                        $request = RestReadTrafficRequest::fromArgs($getVars);
                        $response = (new ReadOgnTraffic($config))->read($request);
                        self::sendTrafficListResponse($response, $config);
                        break;
                    case self::ACTION_READ_ADSBEX_TRAFFIC:
                        $request = RestReadTrafficRequest::fromArgs($getVars);
                        $response = (new ReadAdsbexTraffic($config))->read($request);
                        self::sendTrafficListResponse($response, $config);
                        break;
                    default:
                        self::throwInvalidArgumentError();
                }
                break;
            case self::REQUEST_METHOD_POST:
                $action = isset($postVars["action"]) ? $postVars["action"] : NULL;
                switch ($action) {
                    case self::ACTION_READ_AC_DETAILS:
                        // TrafficDetails::getDetails($postVars, $dbService, $httpService);
                        break;
                    default:
                        self::throwInvalidArgumentError();
                }
                break;
            default:
                self::throwInvalidArgumentError();
        }
    }


    private static function sendTrafficListResponse(array $trafficList, ITrafficConfig $config) {
        $resultArray = RestTrafficListResponse::toRest($trafficList);
        $httpService = $config->getSystemServiceFactory()->getHttpService();
        RequestResponseHelper::sendArrayResponse($httpService, $resultArray);
    }


    private static function throwInvalidArgumentError() {
        throw new InvalidArgumentException("no or invalid action defined!");
    }
}
