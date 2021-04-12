<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestService;

use InvalidArgumentException;
use Navplan\OpenAip\RestModel\SearchAreaItemsRequestConverter;
use Navplan\OpenAip\RestModel\SearchAreaItemsResponseConverter;
use Navplan\OpenAip\RestModel\SearchPointItemsRequestConverter;
use Navplan\OpenAip\RestModel\SearchPointItemsResponseConverter;


class OpenAipServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_SEARCH_POINT_ITEMS = "searchPointItems";
    const ACTION_SEARCH_AREA_ITEMS = "searchAreaItems";


    public static function processRequest(array $getArgs, IOpenAipServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $action = $getArgs[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_SEARCH_POINT_ITEMS:
                $request = SearchPointItemsRequestConverter::fromArgs($getArgs);
                $response = $diContainer->getSearchOpenAipItemUc()->searchPointItems($request);
                $httpService->sendArrayResponse(SearchPointItemsResponseConverter::toRest($response));
                break;
            case self::ACTION_SEARCH_AREA_ITEMS:
                $request = SearchAreaItemsRequestConverter::fromArgs($getArgs);
                $response = $diContainer->getSearchOpenAipItemUc()->searchAreaItems($request);
                $httpService->sendArrayResponse(SearchAreaItemsResponseConverter::toRest($response));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
