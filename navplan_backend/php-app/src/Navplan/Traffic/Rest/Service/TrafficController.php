<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
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


class TrafficController implements IRestController
{
    public const ARG_PARAM = "param";
    public const ARG_PARAM_ADSBEX = "adsbex";
    public const ARG_PARAM_OGN = "ogn";
    public const ARG_PARAM_DETAILS = "details";


    public function __construct(
        private IHttpService $httpService,
        private IReadOgnTrafficUc $readOgnTrafficUc,
        private IReadAdsbexTrafficUc $readAdsbexTrafficUc,
        private IReadAdsbexTrafficWithDetailsUc $readAdsbexTrafficWithDetailsUc,
        private IReadTrafficDetailsUc $readTrafficDetailsUc
    )
    {
    }


    public function processRequest()
    {
        $getArgs = $this->httpService->getGetArgs();
        $param = StringNumberHelper::parseStringOrError($getArgs, self::ARG_PARAM);
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                switch ($param) {
                    case self::ARG_PARAM_OGN:
                        $request = RestTrafficOgnReadRequestConverter::fromArgs($getArgs);
                        $trafficList = $this->readOgnTrafficUc->read($request);
                        $response = RestTrafficOgnListResponseConverter::toRest($trafficList);
                        break;
                    case self::ARG_PARAM_ADSBEX:
                        $request = RestTrafficAdsbexReadRequestConverter::fromArgs($getArgs);
                        $trafficList = $this->readAdsbexTrafficUc->read($request);
                        $response = RestTrafficAdsbexListResponseConverter::toRest($trafficList);
                        break;
                    default:
                        throw new InvalidArgumentException("invalid parameter '" . $param . "'");
                }
                break;
            case HttpRequestMethod::POST:
                $postArgs = $this->httpService->getPostArgs();
                switch ($param) {
                    case self::ARG_PARAM_DETAILS:
                        $request = RestTrafficDetailReadRequestConverter::fromRest($postArgs);
                        $details = $this->readTrafficDetailsUc->readDetails($request);
                        $response = RestTrafficDetailListResponseConverter::toRest($details);
                        break;
                    default:
                        throw new InvalidArgumentException("invalid parameter '" . $param . "'");
                }
                break;
            default:
                throw new InvalidArgumentException("invalid request method!");
        }

        $this->httpService->sendArrayResponse($response);
    }
}
