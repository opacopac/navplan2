<?php declare(strict_types=1);

namespace Navplan\Traffic;

use InvalidArgumentException;
use Navplan\Traffic\Rest\RestReadTrafficDetailRequest;
use Navplan\Traffic\Rest\RestReadTrafficRequest;
use Navplan\Traffic\Rest\RestTrafficDetailListResponse;
use Navplan\Traffic\Rest\RestTrafficListResponse;
use Navplan\Traffic\UseCase\ITrafficConfig;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic;
use Navplan\Traffic\UseCase\ReadOgnTraffic;
use Navplan\Traffic\UseCase\ReadTrafficDetails;


class TrafficServiceProcessor {
    public const REQUEST_METHOD_GET = "GET";
    public const REQUEST_METHOD_POST = "POST";
    public const ACTION_READ_OGN_TRAFFIC = "readogntraffic";
    public const ACTION_READ_ADSBEX_TRAFFIC = "readadsbextraffic";
    public const ACTION_READ_AC_DETAILS = "readacdetails";


    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, ITrafficConfig $config) {
        $httpService = $config->getSystemServiceFactory()->getHttpService();
        switch ($requestMethod) {
            case self::REQUEST_METHOD_GET:
                $action = isset($getVars["action"]) ? $getVars["action"] : NULL;
                switch ($action) {
                    case self::ACTION_READ_OGN_TRAFFIC:
                        $request = RestReadTrafficRequest::fromArgs($getVars);
                        $response = (new ReadOgnTraffic($config))->read($request);
                        $httpService->sendArrayResponse(RestTrafficListResponse::toRest($response));
                        break;
                    case self::ACTION_READ_ADSBEX_TRAFFIC:
                        $request = RestReadTrafficRequest::fromArgs($getVars);
                        $response = (new ReadAdsbexTraffic($config))->read($request);
                        $httpService->sendArrayResponse(RestTrafficListResponse::toRest($response));
                        break;
                    default:
                        throw new InvalidArgumentException("no or invalid action defined!");
                }
                break;
            case self::REQUEST_METHOD_POST:
                $action = isset($postVars["action"]) ? $postVars["action"] : NULL;
                switch ($action) {
                    case self::ACTION_READ_AC_DETAILS:
                        $request = RestReadTrafficDetailRequest::fromRest($postVars);
                        $response = (new ReadTrafficDetails($config))->readDetails($request);
                        $httpService->sendArrayResponse(RestTrafficDetailListResponse::toRest($response));
                        break;
                    default:
                        throw new InvalidArgumentException("no or invalid action defined!");
                }
                break;
            default:
                throw new InvalidArgumentException("no or invalid action defined!");
        }
    }
}
