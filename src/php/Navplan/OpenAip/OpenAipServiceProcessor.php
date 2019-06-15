<?php declare(strict_types=1);

namespace Navplan\OpenAip;

use InvalidArgumentException;
use Navplan\OpenAip\Rest\RestSearchAreaItemsRequest;
use Navplan\OpenAip\Rest\RestSearchAreaItemsResponse;
use Navplan\OpenAip\Rest\RestSearchPointItemsRequest;
use Navplan\OpenAip\Rest\RestSearchPointItemsResponse;
use Navplan\OpenAip\UseCase\IOpenAipConfig;
use Navplan\OpenAip\UseCase\SearchOpenAipItems;


class OpenAipServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_SEARCH_POINT_ITEMS = "searchPointItems";
    const ACTION_SEARCH_AREA_ITEMS = "searchAreaItems";


    public static function processRequest(array $getArgs, IOpenAipConfig $config) {
        $httpService = $config->getSystemServiceFactory()->getHttpService();
        $action = isset($getArgs[self::ARG_ACTION]) ? $getArgs[self::ARG_ACTION] : NULL;
        switch ($action) {
            case self::ACTION_SEARCH_POINT_ITEMS:
                $request = RestSearchPointItemsRequest::fromArgs($getArgs);
                $response = (new SearchOpenAipItems($config))->searchPointItems($request);
                $httpService->sendArrayResponse(RestSearchPointItemsResponse::toRest($response));
                break;
            case self::ACTION_SEARCH_AREA_ITEMS:
                $request = RestSearchAreaItemsRequest::fromArgs($getArgs);
                $response = (new SearchOpenAipItems($config))->searchAreaItems($request);
                $httpService->sendArrayResponse(RestSearchAreaItemsResponse::toRest($response));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
