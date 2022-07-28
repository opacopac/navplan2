<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestService;

use InvalidArgumentException;
use Navplan\System\DomainService\IHttpService;
use Navplan\VerticalMap\DomainService\IVerticalMapService;
use Navplan\VerticalMap\RestModel\ReadVerticalMapRequest;
use Navplan\VerticalMap\RestModel\ReadVerticalMapResponse;


class VerticalMapController {
    const ARG_ACTION = "action";
    const ACTION_READ_VMAP = "readvmap";


    public static function processRequest(
        IVerticalMapService $verticalMapService,
        IHttpService $httpService
    ) {
        $postArgs = $httpService->getPostArgs();
        $action = $postArgs[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_READ_VMAP:
                $request = ReadVerticalMapRequest::fromArgs($postArgs);
                $verticalMap = $verticalMapService->getRouteVerticalMap($request->wpPositions);
                $response = new ReadVerticalMapResponse($verticalMap);
                $httpService->sendArrayResponse($response->toRest());
                break;
            default:
                throw new InvalidArgumentException('unknown request method');
        }
    }
}
