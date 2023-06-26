<?php declare(strict_types=1);

namespace Navplan\VerticalMap\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\VerticalMap\Domain\Service\IVerticalMapService;
use Navplan\VerticalMap\Domain\Service\RestModel\ReadVerticalMapRequest;
use Navplan\VerticalMap\Domain\Service\RestModel\ReadVerticalMapResponse;


class VerticalMapController implements IRestController {
    const ARG_ACTION = "action";
    const ACTION_READ_VMAP = "readvmap";


    public function __construct(
        private IVerticalMapService $verticalMapService,
        private IHttpService $httpService
    ) {
    }


    public function processRequest() {
        $postArgs = $this->httpService->getPostArgs();
        $action = $postArgs[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_READ_VMAP:
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
                throw new InvalidArgumentException('unknown request method');
        }
    }
}
