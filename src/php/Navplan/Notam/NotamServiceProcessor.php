<?php declare(strict_types=1);

namespace Navplan\Notam;

use InvalidArgumentException;
use Navplan\Notam\Rest\RestReadNotamRequest;
use Navplan\Notam\Rest\RestReadNotamResponse;
use Navplan\Notam\UseCase\INotamConfig;
use Navplan\Notam\UseCase\SearchNotam;


class NotamServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_SEARCH_BY_EXTENT = "searchByExtent";


    public static function processRequest(array $getArgs, INotamConfig $config) {
        $httpService = $config->getSystemServiceFactory()->getHttpService();
        $action = isset($getArgs[self::ARG_ACTION]) ? $getArgs[self::ARG_ACTION] : NULL;
        switch ($action) {
            case self::ACTION_SEARCH_BY_EXTENT:
                $request = RestReadNotamRequest::fromArgs($getArgs);
                $response = (new SearchNotam($config))->searchByExtent($request);
                $httpService->sendArrayResponse(RestReadNotamResponse::toRest($response));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
