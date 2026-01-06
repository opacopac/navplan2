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
use Navplan\User\Rest\Model\RestTokenConverter;


class AirportController implements IRestController
{
    private const string ARG_QUERY_ICAO = "icao";


    public function __construct(
        private readonly IHttpService $httpService,
        private readonly IAirportService $airportService
    )
    {
    }


    public function processRequest(): void
    {
        $token = RestTokenConverter::getTokenOrNull($this->httpService->getCookies());
        $getArgs = $this->httpService->getGetArgs();
        $id = RestIdConverter::getIdOrNull($getArgs);
        $icao = StringNumberHelper::parseStringOrNull($getArgs, self::ARG_QUERY_ICAO);

        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($id) {
                    // get airport by id
                    $airport = $this->airportService->readById($id, $token);
                    $response = RestAirportConverter::toRest($airport);
                } else if ($icao) {
                    // Check if multiple ICAOs are provided (comma-separated)
                    if (str_contains($icao, ',')) {
                        // get airports by multiple icaos
                        $icaos = array_map('trim', explode(',', $icao));
                        $icaos = array_map('strtoupper', $icaos);
                        $icaos = array_filter($icaos, fn($ic) => !empty($ic)); // Remove empty values

                        $airports = $this->airportService->readByIcaos($icaos);
                        $response = RestAirportConverter::toRestList($airports);
                    } else {
                        // get airport by single icao
                        $airport = $this->airportService->readByIcao($icao, $token);
                        $response = RestAirportConverter::toRest($airport);
                    }
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
