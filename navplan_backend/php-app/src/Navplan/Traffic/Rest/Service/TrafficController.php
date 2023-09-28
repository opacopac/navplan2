<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest\Service;

use InvalidArgumentException;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Traffic\Rest\Model\RestTrafficAdsbexListResponseConverter;
use Navplan\Traffic\Rest\Model\RestTrafficAdsbexReadRequestConverter;
use Navplan\Traffic\Rest\Model\RestTrafficAdsbexWithDetailsListResponseConverter;
use Navplan\Traffic\Rest\Model\RestTrafficDetailListResponseConverter;
use Navplan\Traffic\Rest\Model\RestTrafficDetailReadRequestConverter;
use Navplan\Traffic\Rest\Model\RestTrafficOgnListResponseConverter;
use Navplan\Traffic\Rest\Model\RestTrafficOgnReadRequestConverter;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\IReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\IReadAdsbexTrafficWithDetailsUc;
use Navplan\Traffic\UseCase\ReadOgnTraffic\IReadOgnTrafficUc;
use Navplan\Traffic\UseCase\ReadTrafficDetails\IReadTrafficDetailsUc;


class TrafficController {
    public const ACTION_READ_OGN_TRAFFIC = "readogntraffic";
    public const ACTION_READ_ADSBEX_TRAFFIC = "readadsbextraffic";
    public const ACTION_READ_ADSBEX_TRAFFIC_WITH_DETAILS = "readadsbextrafficwithdetails";
    public const ACTION_READ_AC_DETAILS = "readtrafficdetails";


    public static function processRequest(
        IHttpService $httpService,
        IReadOgnTrafficUc $readOgnTrafficUc,
        IReadAdsbexTrafficUc $readAdsbexTrafficUc,
        IReadAdsbexTrafficWithDetailsUc $readAdsbexTrafficWithDetailsUc,
        IReadTrafficDetailsUc $readTrafficDetailsUc
    ) {
        switch ($httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $getVars = $httpService->getGetArgs();
                $action = $getVars["action"] ?? NULL;
                switch ($action) {
                    case self::ACTION_READ_OGN_TRAFFIC:
                        $request = RestTrafficOgnReadRequestConverter::fromArgs($getVars);
                        $response = $readOgnTrafficUc->read($request);
                        $httpService->sendArrayResponse(RestTrafficOgnListResponseConverter::toRest($response));
                        break;
                    case self::ACTION_READ_ADSBEX_TRAFFIC:
                        $request = RestTrafficAdsbexReadRequestConverter::fromArgs($getVars);
                        $response = $readAdsbexTrafficUc->read($request);
                        $httpService->sendArrayResponse(RestTrafficAdsbexListResponseConverter::toRest($response));
                        break;
                    case self::ACTION_READ_ADSBEX_TRAFFIC_WITH_DETAILS:
                        $request = RestTrafficAdsbexReadRequestConverter::fromArgs($getVars);
                        $response = $readAdsbexTrafficWithDetailsUc->read($request);
                        $httpService->sendArrayResponse(RestTrafficAdsbexWithDetailsListResponseConverter::toRest($response));
                        break;
                    default:
                        throw new InvalidArgumentException("no or invalid get-action defined!");
                }
                break;
            case HttpRequestMethod::POST:
                $postVars = $httpService->getPostArgs();
                $action = $postVars["action"] ?? NULL;
                switch ($action) {
                    case self::ACTION_READ_AC_DETAILS:
                        $request = RestTrafficDetailReadRequestConverter::fromRest($postVars);
                        $response = $readTrafficDetailsUc->readDetails($request);
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
