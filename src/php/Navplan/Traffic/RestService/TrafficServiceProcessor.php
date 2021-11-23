<?php declare(strict_types=1);

namespace Navplan\Traffic\RestService;

use InvalidArgumentException;
use Navplan\Traffic\RestModel\RestTrafficAdsbexListResponseConverter;
use Navplan\Traffic\RestModel\RestTrafficAdsbexReadRequestConverter;
use Navplan\Traffic\RestModel\RestTrafficAdsbexWithDetailsListResponseConverter;
use Navplan\Traffic\RestModel\RestTrafficDetailListResponseConverter;
use Navplan\Traffic\RestModel\RestTrafficDetailReadRequestConverter;
use Navplan\Traffic\RestModel\RestTrafficOgnListResponseConverter;
use Navplan\Traffic\RestModel\RestTrafficOgnReadRequestConverter;


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
                        $request = RestTrafficOgnReadRequestConverter::fromArgs($getVars);
                        $response = $diContainer->getReadOgnTrafficUc()->read($request);
                        $httpService->sendArrayResponse(RestTrafficOgnListResponseConverter::toRest($response));
                        break;
                    case self::ACTION_READ_ADSBEX_TRAFFIC:
                        $request = RestTrafficAdsbexReadRequestConverter::fromArgs($getVars);
                        $response = $diContainer->getReadAdsbexTrafficUc()->read($request);
                        $httpService->sendArrayResponse(RestTrafficAdsbexListResponseConverter::toRest($response));
                        break;
                    case self::ACTION_READ_ADSBEX_TRAFFIC_WITH_DETAILS:
                        $request = RestTrafficAdsbexReadRequestConverter::fromArgs($getVars);
                        $response = $diContainer->getReadAdsbexTrafficWithDetailsUc()->read($request);
                        $httpService->sendArrayResponse(RestTrafficAdsbexWithDetailsListResponseConverter::toRest($response));
                        break;
                    default:
                        throw new InvalidArgumentException("no or invalid get-action defined!");
                }
                break;
            case self::REQUEST_METHOD_POST:
                $action = $postVars["action"] ?? NULL;
                switch ($action) {
                    case self::ACTION_READ_AC_DETAILS:
                        $request = RestTrafficDetailReadRequestConverter::fromRest($postVars);
                        $response = $diContainer->getReadTrafficDetailsUc()->readDetails($request);
                        $httpService->sendArrayResponse(RestTrafficDetailListResponseConverter::toRest($response));
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
