<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\StringNumberHelper;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\Traffic\Rest\Model\RestTrafficAdsbexListResponseConverter;
use Navplan\Traffic\Rest\Model\RestTrafficAdsbexReadRequestConverter;
use Navplan\Traffic\Rest\Model\RestTrafficDetailListResponseConverter;
use Navplan\Traffic\Rest\Model\RestTrafficDetailReadRequestConverter;
use Navplan\Traffic\Rest\Model\RestTrafficOgnListResponseConverter;
use Navplan\Traffic\Rest\Model\RestTrafficOgnReadRequestConverter;
use Navplan\Traffic\UseCase\ReadAdsbexTraffic\IReadAdsbexTrafficUc;
use Navplan\Traffic\UseCase\ReadAdsbexTrafficWithDetails\IReadAdsbexTrafficWithDetailsUc;
use Navplan\Traffic\UseCase\ReadOgnTraffic\IReadOgnTrafficUc;
use Navplan\Traffic\UseCase\ReadTrafficDetails\IReadTrafficDetailsUc;


class TrafficController
{
    public const ARG_PARAM = "param";
    public const ARG_PARAM_ADSBEX = "adsbex";
    public const ARG_PARAM_OGN = "ogn";
    public const ARG_PARAM_DETAILS = "details";


    public static function processRequest(
        IHttpService                    $httpService,
        IReadOgnTrafficUc               $readOgnTrafficUc,
        IReadAdsbexTrafficUc            $readAdsbexTrafficUc,
        IReadAdsbexTrafficWithDetailsUc $readAdsbexTrafficWithDetailsUc,
        IReadTrafficDetailsUc           $readTrafficDetailsUc
    )
    {
        $getArgs = $httpService->getGetArgs();
        $param = StringNumberHelper::parseStringOrError($getArgs, self::ARG_PARAM);
        switch ($httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                switch ($param) {
                    case self::ARG_PARAM_OGN:
                        $request = RestTrafficOgnReadRequestConverter::fromArgs($getArgs);
                        $trafficList = $readOgnTrafficUc->read($request);
                        $response = RestTrafficOgnListResponseConverter::toRest($trafficList);
                        break;
                    case self::ARG_PARAM_ADSBEX:
                        $request = RestTrafficAdsbexReadRequestConverter::fromArgs($getArgs);
                        $trafficList = $readAdsbexTrafficUc->read($request);
                        $response = RestTrafficAdsbexListResponseConverter::toRest($trafficList);
                        break;
                    default:
                        throw new InvalidArgumentException("invalid parameter '" . $param . "'");
                }
                break;
            case HttpRequestMethod::POST:
                $postArgs = $httpService->getPostArgs();
                switch ($param) {
                    case self::ARG_PARAM_DETAILS:
                        $request = RestTrafficDetailReadRequestConverter::fromRest($postArgs);
                        $details = $readTrafficDetailsUc->readDetails($request);
                        $response = RestTrafficDetailListResponseConverter::toRest($details);
                        break;
                    default:
                        throw new InvalidArgumentException("invalid parameter '" . $param . "'");
                }
                break;
            default:
                throw new InvalidArgumentException("invalid request method!");
        }

        $httpService->sendArrayResponse($response);
    }
}
