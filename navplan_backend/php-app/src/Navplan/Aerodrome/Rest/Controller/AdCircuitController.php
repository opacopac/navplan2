<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Rest\Controller;

use InvalidArgumentException;
use Navplan\Aerodrome\Domain\Service\IAirportCircuitService;
use Navplan\Aerodrome\Rest\Converter\RestAirportCircuitConverter;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class AdCircuitController implements IRestController
{
    public function __construct(
        private IHttpService           $httpService,
        private IAirportCircuitService $airportCircuitService,
    )
    {
    }


    public function processRequest()
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $extent = RestExtent2dConverter::fromArgs($this->httpService->getGetArgs());
                $adList = $this->airportCircuitService->getCircuitsByExtent($extent);
                $this->httpService->sendArrayResponse(RestAirportCircuitConverter::toRestList($adList));
                break;
            default:
                throw new InvalidArgumentException("invalid request");
        }
    }
}
