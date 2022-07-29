<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Rest\Controller;

use InvalidArgumentException;
use Navplan\Aerodrome\Domain\Service\IAirportChartService;
use Navplan\Aerodrome\Domain\Service\IAirportCircuitService;
use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Aerodrome\Domain\Service\IReportingPointService;
use Navplan\Aerodrome\Rest\Converter\RestAirportChart2Converter;
use Navplan\Aerodrome\Rest\Converter\RestAirportChartConverter;
use Navplan\Aerodrome\Rest\Converter\RestAirportCircuitConverter;
use Navplan\Aerodrome\Rest\Converter\RestAirportConverter;
use Navplan\Aerodrome\Rest\Converter\RestReportingPointConverter;
use Navplan\Aerodrome\Rest\Converter\RestShortAirportConverter;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\System\DomainService\IHttpService;


class AirportController implements IRestController {
    const ARG_ACTION = "action";
    const ACTION_GET_SHORT_AD_BY_EXTENT = "getShortAdByExtent";
    const ACTION_GET_AD_BY_ID = "getAdById";
    const ACTION_GET_AD_BY_ICAO = "getAdByIcao";
    const ACTION_GET_AD_CIRCUIT_BY_EXTENT = "getAdCircuitsByExtent";
    const ACTION_GET_RP_BY_EXTENT = "getRpByExtent";
    const ACTION_GET_CHART_BY_ID = "getChartById";
    const ACTION_GET_CHART2_BY_ID = "getChart2ById";


    public function __construct(
        private IHttpService $httpService,
        private IAirportService $airportService,
        private IAirportCircuitService $airportCircuitService,
        private IAirportChartService $airportChartService,
        private IReportingPointService $reportingPointService
    ) {
    }


    public function processRequest() {
        $args = $this->httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_SHORT_AD_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $zoom = intval($args["zoom"]);
                $adList = $this->airportService->searchShortByExtent($extent, $zoom);
                $this->httpService->sendArrayResponse(RestShortAirportConverter::toRestList($adList));
                break;
            case self::ACTION_GET_AD_BY_ID:
                $airportId = intval($args["id"]);
                $airport = $this->airportService->readById($airportId);
                $airportRest = RestAirportConverter::toRest($airport);
                $this->httpService->sendArrayResponse($airportRest);
                break;
            case self::ACTION_GET_AD_BY_ICAO:
                $icao = $args["icao"];
                $airport = $this->airportService->readByIcao($icao);
                $airportRest = RestAirportConverter::toRest($airport);
                $this->httpService->sendArrayResponse($airportRest);
                break;
            case self::ACTION_GET_AD_CIRCUIT_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $adList = $this->airportCircuitService->getCircuitsByExtent($extent);
                $this->httpService->sendArrayResponse(RestAirportCircuitConverter::toRestList($adList));
                break;
            case self::ACTION_GET_RP_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $rpList = $this->reportingPointService->searchByExtent($extent);
                $this->httpService->sendArrayResponse(RestReportingPointConverter::toRestList($rpList));
                break;
            case self::ACTION_GET_CHART_BY_ID:
                $id = intval($args["id"]);
                $adChart = $this->airportChartService->getAdChartById($id);
                $this->httpService->sendArrayResponse(RestAirportChartConverter::toRest($adChart));
                break;
            case self::ACTION_GET_CHART2_BY_ID:
                $id = intval($args["id"]);
                $adChart = $this->airportChartService->getAdChart2ById($id);
                $this->httpService->sendArrayResponse(RestAirportChart2Converter::toRest($adChart));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
