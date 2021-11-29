<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestService;

use InvalidArgumentException;
use Navplan\VerticalMap\RestModel\ReadVerticalMapRequest;
use Navplan\VerticalMap\RestModel\ReadVerticalMapResponse;


class VerticalMapServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_READ_VMAP = "readvmap";


    public static function processRequest(IVerticalMapDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $postArgs = $httpService->getPostArgs();
        $action = $postArgs[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_READ_VMAP:
                $request = ReadVerticalMapRequest::fromArgs($postArgs);
                $verticalMap = $diContainer->getVerticalMapService()->getRouteVerticalMap($request->wpPositions);
                $response = new ReadVerticalMapResponse($verticalMap);
                $httpService->sendArrayResponse($response->toRest());
                break;
            default:
                throw new InvalidArgumentException('unknown request method');
        }
    }
}
