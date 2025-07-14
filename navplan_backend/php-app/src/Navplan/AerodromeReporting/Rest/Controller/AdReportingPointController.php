<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Rest\Controller;

use InvalidArgumentException;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByExtentQuery;
use Navplan\AerodromeReporting\Domain\Query\IAerodromeReportingByIcaoQuery;
use Navplan\AerodromeReporting\Rest\Converter\RestReportingPointConverter;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class AdReportingPointController implements IRestController
{
    const ARG_AD_ICAO = "adicao";


    public function __construct(
        private readonly IHttpService $httpService,
        private readonly IAerodromeReportingByExtentQuery $aerodromeReportingByExtentQuery,
        private readonly IAerodromeReportingByIcaoQuery $aerodromeReportingByIcaoQuery
    )
    {
    }


    public function processRequest(): void
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $adIcao = StringNumberHelper::parseStringOrNull($this->httpService->getGetArgs(), self::ARG_AD_ICAO);
                if ($adIcao) {
                    $rpList = $this->aerodromeReportingByIcaoQuery->read($adIcao);
                } else {
                    $extent = RestExtent2dConverter::fromArgs($this->httpService->getGetArgs());
                    $rpList = $this->aerodromeReportingByExtentQuery->search($extent);
                }
                $response = RestReportingPointConverter::toRestList($rpList);
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }

        $this->httpService->sendArrayResponse($response);
    }
}
