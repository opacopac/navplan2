<?php declare(strict_types=1);

namespace Navplan\VerticalMap\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\VerticalMap\Domain\Service\IVerticalMapService;
use Navplan\VerticalMap\Domain\Service\RestModel\ReadVerticalMapRequest;
use Navplan\VerticalMap\Domain\Service\RestModel\ReadVerticalMapResponse;


class VerticalMapController implements IRestController
{
    public function __construct(
        private IVerticalMapService $verticalMapService,
        private IHttpService        $httpService
    )
    {
    }


    public function processRequest()
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::POST:
                $postArgs = $this->httpService->getPostArgs();
                $request = ReadVerticalMapRequest::fromArgs($postArgs);
                $verticalMap = $this->verticalMapService->getRouteVerticalMap(
                    $request->route,
                    $request->forecastStep,
                    $request->layer
                );
                $response = new ReadVerticalMapResponse($verticalMap);
                $this->httpService->sendArrayResponse($response->toRest());
                break;
            default:
                throw new InvalidArgumentException('invalid request method');
        }
    }
}
