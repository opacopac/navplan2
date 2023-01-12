<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestService;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\DomainService\IHttpService;
use Navplan\VerticalMap\DomainService\IVerticalMapService;
use Navplan\VerticalMap\RestModel\ReadVerticalMapRequest;
use Navplan\VerticalMap\RestModel\ReadVerticalMapResponse;


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
                $verticalMap = $this->verticalMapService->getRouteVerticalMap($request->route, $request->forecastStep);
                $response = new ReadVerticalMapResponse($verticalMap);
                $this->httpService->sendArrayResponse($response->toRest());
                break;
            default:
                throw new InvalidArgumentException('unknown request method');
        }
    }
}
