<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Rest\Controller;

use InvalidArgumentException;
use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Aerodrome\Rest\Converter\RestAirportConverter;
use Navplan\Aerodrome\Rest\Converter\RestShortAirportConverter;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\Common\Rest\Converter\RestIdConverter;
use Navplan\Common\Rest\Converter\RestZoomConverter;
use Navplan\Common\StringNumberHelper;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class AirportController implements IRestController
{
    const ARG_QUERY_ICAO = "icao";


    public function __construct(
        private IHttpService $httpService,
        private IAirportService $airportService
    )
    {
    }


    public function processRequest()
    {
        $getArgs = $this->httpService->getGetArgs();
        $id = RestIdConverter::getIdOrNull($getArgs);
        $icao = StringNumberHelper::parseStringOrNull($getArgs, self::ARG_QUERY_ICAO);

        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($id) {
                    // get airport by id
                    $airport = $this->airportService->readById($id);
                    $response = RestAirportConverter::toRest($airport);
                } else if ($icao) {
                    // get airport by icao
                    $airport = $this->airportService->readByIcao($icao);
                    $response = RestAirportConverter::toRest($airport);
                } else {
                    // search airports by extent
                    $extent = RestExtent2dConverter::fromArgs($getArgs);
                    $zoom = RestZoomConverter::fromArgs($getArgs);
                    $adList = $this->airportService->searchShortByExtent($extent, $zoom);
                    $response = RestShortAirportConverter::toRestList($adList);
                }
                $this->httpService->sendArrayResponse($response);
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
