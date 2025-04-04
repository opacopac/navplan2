<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Rest\Controller;

use InvalidArgumentException;
use Navplan\AerodromeReporting\Domain\Service\IReportingPointService;
use Navplan\AerodromeReporting\Rest\Converter\RestReportingPointConverter;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class AdReportingPointController implements IRestController
{
    public function __construct(
        private IHttpService $httpService,
        private IReportingPointService $reportingPointService
    )
    {
    }


    public function processRequest()
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $extent = RestExtent2dConverter::fromArgs($this->httpService->getGetArgs());
                $rpList = $this->reportingPointService->searchByExtent($extent);
                $response = RestReportingPointConverter::toRestList($rpList);
                $this->httpService->sendArrayResponse($response);
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
