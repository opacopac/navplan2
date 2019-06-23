<?php declare(strict_types=1);

namespace Navplan\Traffic;

use InvalidArgumentException;
use Navplan\Traffic\Rest\RestTrafficDetailReadRequest;
use Navplan\Traffic\Rest\RestTrafficOgnReadRequest;
use Navplan\Traffic\Rest\RestTrafficAdsbexReadRequest;
use Navplan\Traffic\Rest\RestTrafficDetailListResponse;
use Navplan\Traffic\Rest\RestTrafficAdsbexListResponse;
use Navplan\Traffic\Rest\RestTrafficOgnListResponse;
use Navplan\Traffic\UseCase\ITrafficConfig;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic;
use Navplan\Traffic\UseCase\ReadOgnTraffic;
use Navplan\Traffic\UseCase\ReadTrafficDetails;


class TrafficServiceProcessor {
    public const REQUEST_METHOD_GET = "GET";
    public const REQUEST_METHOD_POST = "POST";
    public const ACTION_READ_OGN_TRAFFIC = "readogntraffic";
    public const ACTION_READ_ADSBEX_TRAFFIC = "readadsbextraffic";
    public const ACTION_READ_AC_DETAILS = "readtrafficdetails";


    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, ITrafficConfig $config) {
        $httpService = $config->getSystemServiceFactory()->getHttpService();
        switch ($requestMethod) {
            case self::REQUEST_METHOD_GET:
                $action = isset($getVars["action"]) ? $getVars["action"] : NULL;
                switch ($action) {
                    case self::ACTION_READ_OGN_TRAFFIC:
                        $request = RestTrafficOgnReadRequest::fromArgs($getVars);
                        $response = (new ReadOgnTraffic($config))->read($request);
                        $httpService->sendArrayResponse(RestTrafficOgnListResponse::toRest($response));
                        break;
                    case self::ACTION_READ_ADSBEX_TRAFFIC:
                        $request = RestTrafficAdsbexReadRequest::fromArgs($getVars);
                        $response = (new ReadAdsbexTraffic($config))->read($request);
                        $httpService->sendArrayResponse(RestTrafficAdsbexListResponse::toRest($response));
                        break;
                    default:
                        throw new InvalidArgumentException("no or invalid get-action defined!");
                }
                break;
            case self::REQUEST_METHOD_POST:
                $action = isset($postVars["action"]) ? $postVars["action"] : NULL;
                switch ($action) {
                    case self::ACTION_READ_AC_DETAILS:
                        $request = RestTrafficDetailReadRequest::fromRest($postVars);
                        $response = (new ReadTrafficDetails($config))->readDetails($request);
                        $httpService->sendArrayResponse(RestTrafficDetailListResponse::toRest($response));
                        break;
                    default:
                        throw new InvalidArgumentException("no or invalid post-action defined!");
                }
                break;
            default:
                throw new InvalidArgumentException("invalid request method defined!");
        }
    }
}
