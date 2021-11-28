<?php declare(strict_types=1);

namespace Navplan\Notam\RestService;

use InvalidArgumentException;
use Navplan\Notam\RestModel\ReadNotamByExtentRequestConverter;
use Navplan\Notam\RestModel\ReadNotamByIcaoRequestConverter;
use Navplan\Notam\RestModel\ReadNotamByPositionRequestConverter;
use Navplan\Notam\RestModel\ReadNotamResponseConverter;


class NotamServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_SEARCH_BY_EXTENT = "searchByExtent";
    const ACTION_SEARCH_BY_POSITION = "searchByPosition";
    const ACTION_SEARCH_BY_ICAO = "searchByIcao";


    public static function processRequest(INotamServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $getArgs = $httpService->getGetArgs();
        $action = $getArgs[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_SEARCH_BY_EXTENT:
                $request = ReadNotamByExtentRequestConverter::fromArgs($getArgs);
                $response = $diContainer->getSearchNotamUc()->searchByExtent($request);
                $httpService->sendArrayResponse(ReadNotamResponseConverter::toRest($response));
                break;
            case self::ACTION_SEARCH_BY_POSITION:
                $request = ReadNotamByPositionRequestConverter::fromArgs($getArgs);
                $response = $diContainer->getSearchNotamUc()->searchByPosition($request);
                $httpService->sendArrayResponse(ReadNotamResponseConverter::toRest($response));
                break;
            case self::ACTION_SEARCH_BY_ICAO:
                $request = ReadNotamByIcaoRequestConverter::fromArgs($getArgs);
                $response = $diContainer->getSearchNotamUc()->searchByIcao($request);
                $httpService->sendArrayResponse(ReadNotamResponseConverter::toRest($response));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
