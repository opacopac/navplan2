<?php declare(strict_types=1);

namespace Navplan\Traffic\RestService;

use InvalidArgumentException;
use Navplan\Traffic\RestModel\TrafficAdsbexListResponseConverter;
use Navplan\Traffic\RestModel\TrafficAdsbexReadRequestConverter;
use Navplan\Traffic\RestModel\TrafficAdsbexWithDetailsListResponseConverter;
use Navplan\Traffic\RestModel\TrafficDetailListResponseConverter;
use Navplan\Traffic\RestModel\TrafficDetailReadRequestConverter;
use Navplan\Traffic\RestModel\TrafficOgnListResponseConverter;
use Navplan\Traffic\RestModel\TrafficOgnReadRequestConverter;


class TrafficServiceProcessor {
    public const REQUEST_METHOD_GET = "GET";
    public const REQUEST_METHOD_POST = "POST";
    public const ACTION_READ_OGN_TRAFFIC = "readogntraffic";
    public const ACTION_READ_ADSBEX_TRAFFIC = "readadsbextraffic";
    public const ACTION_READ_ADSBEX_TRAFFIC_WITH_DETAILS = "readadsbextrafficwithdetails";
    public const ACTION_READ_AC_DETAILS = "readtrafficdetails";


    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, ITrafficServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        switch ($requestMethod) {
            case self::REQUEST_METHOD_GET:
                $action = $getVars["action"] ?? NULL;
                switch ($action) {
                    case self::ACTION_READ_OGN_TRAFFIC:
                        $request = TrafficOgnReadRequestConverter::fromArgs($getVars);
                        $response = $diContainer->getReadOgnTrafficUc()->read($request);
                        $httpService->sendArrayResponse(TrafficOgnListResponseConverter::toRest($response));
                        break;
                    case self::ACTION_READ_ADSBEX_TRAFFIC:
                        $request = TrafficAdsbexReadRequestConverter::fromArgs($getVars);
                        $response = $diContainer->getReadAdsbexTrafficUc()->read($request);
                        $httpService->sendArrayResponse(TrafficAdsbexListResponseConverter::toRest($response));
                        break;
                    case self::ACTION_READ_ADSBEX_TRAFFIC_WITH_DETAILS:
                        $request = TrafficAdsbexReadRequestConverter::fromArgs($getVars);
                        $response = $diContainer->getReadAdsbexTrafficWithDetailsUc()->read($request);
                        $httpService->sendArrayResponse(TrafficAdsbexWithDetailsListResponseConverter::toRest($response));
                        break;
                    default:
                        throw new InvalidArgumentException("no or invalid get-action defined!");
                }
                break;
            case self::REQUEST_METHOD_POST:
                $action = $postVars["action"] ?? NULL;
                switch ($action) {
                    case self::ACTION_READ_AC_DETAILS:
                        $request = TrafficDetailReadRequestConverter::fromRest($postVars);
                        $response = $diContainer->getReadTrafficDetailsUc()->readDetails($request);
                        $httpService->sendArrayResponse(TrafficDetailListResponseConverter::toRest($response));
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
