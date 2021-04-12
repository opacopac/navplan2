<?php declare(strict_types=1);

namespace Navplan\Notam\RestService;

use InvalidArgumentException;
use Navplan\Notam\RestModel\ReadNotamRequestConverter;
use Navplan\Notam\RestModel\ReadNotamResponseConverter;


class NotamServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_SEARCH_BY_EXTENT = "searchByExtent";


    public static function processRequest(array $getArgs, INotamServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $action = $getArgs[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_SEARCH_BY_EXTENT:
                $request = ReadNotamRequestConverter::fromArgs($getArgs);
                $response = $diContainer->getSearchNotamUc()->searchByExtent($request);
                $httpService->sendArrayResponse(ReadNotamResponseConverter::toRest($response));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
