<?php declare(strict_types=1);

namespace Navplan\AerodromeCircuit\Rest\Controller;

use InvalidArgumentException;
use Navplan\AerodromeCircuit\Domain\Service\IAirportCircuitService;
use Navplan\AerodromeCircuit\Rest\Converter\RestAirportCircuitConverter;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class AdCircuitController implements IRestController
{
    public function __construct(
        private IHttpService $httpService,
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
                $response = RestAirportCircuitConverter::toRestList($adList);
                $this->httpService->sendArrayResponse($response);
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
