<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestService;

use InvalidArgumentException;
use Navplan\VerticalMap\RestModel\ReadVerticalMapRequestConverter;
use Navplan\VerticalMap\RestModel\ReadVerticalMapResponseConverter;


class VerticalMapServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_READ_VMAP = "readvmap";


    public static function processRequest(IVerticalMapDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $postArgs = $httpService->getPostArgs();
        $action = $postArgs[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_READ_VMAP:
                $request = ReadVerticalMapRequestConverter::fromArgs($postArgs);
                $response = $diContainer->getReadVerticalMapUc()->read($request);
                $httpService->sendArrayResponse(ReadVerticalMapResponseConverter::toRest($response));
                break;
            default:
                throw new InvalidArgumentException('unknown request method');
        }
    }
}
