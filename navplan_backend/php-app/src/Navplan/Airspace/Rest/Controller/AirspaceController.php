<?php declare(strict_types=1);

namespace Navplan\Airspace\Rest\Controller;

use InvalidArgumentException;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Airspace\Rest\Converter\RestAirspaceConverter;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\Common\Rest\Converter\RestZoomConverter;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


readonly class AirspaceController implements IRestController
{
    public function __construct(
        private IAirspaceService $airspaceService,
        private IHttpService $httpService
    )
    {
    }


    public function processRequest(): void
    {
        $getArgs = $this->httpService->getGetArgs();
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $extent = RestExtent2dConverter::fromArgs($getArgs);
                $zoom = RestZoomConverter::fromArgs($getArgs);
                $adList = $this->airspaceService->searchByExtent($extent, $zoom);
                $response = RestAirspaceConverter::toRestList($adList);
                $this->httpService->sendArrayResponse($response);
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }
    }
}
