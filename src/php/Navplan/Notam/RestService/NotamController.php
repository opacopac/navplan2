<?php declare(strict_types=1);

namespace Navplan\Notam\RestService;

use InvalidArgumentException;
use Navplan\Notam\DomainService\INotamService;
use Navplan\Notam\RestModel\ReadNotamByExtentRequest;
use Navplan\Notam\RestModel\ReadNotamByIcaoRequest;
use Navplan\Notam\RestModel\ReadNotamByPositionRequest;
use Navplan\Notam\RestModel\ReadNotamResponse;
use Navplan\System\DomainService\IHttpService;


class NotamController {
    const ARG_ACTION = "action";
    const ACTION_SEARCH_BY_EXTENT = "searchByExtent";
    const ACTION_SEARCH_BY_POSITION = "searchByPosition";
    const ACTION_SEARCH_BY_ICAO = "searchByIcao";


    public static function processRequest(
        INotamService $notamService,
        IHttpService $httpService
    ) {
        $getArgs = $httpService->getGetArgs();
        $action = $getArgs[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_SEARCH_BY_EXTENT:
                $request = ReadNotamByExtentRequest::fromRest($getArgs);
                $notamList = $notamService->searchByExtent($request->extent, $request->zoom, $request->minNotamTimestamp, $request->maxNotamTimestamp);
                $response = new ReadNotamResponse($notamList);
                $httpService->sendArrayResponse($response->toRest());
                break;
            case self::ACTION_SEARCH_BY_POSITION:
                $request = ReadNotamByPositionRequest::fromRest($getArgs);
                $notamList = $notamService->searchByPosition($request->position, $request->minNotamTimestamp, $request->maxNotamTimestamp);
                $response = new ReadNotamResponse($notamList);
                $httpService->sendArrayResponse($response->toRest());
                break;
            case self::ACTION_SEARCH_BY_ICAO:
                $request = ReadNotamByIcaoRequest::fromRest($getArgs);
                $notamList = $notamService->searchByIcao($request->airportIcao, $request->minNotamTimestamp, $request->maxNotamTimestamp);
                $response = new ReadNotamResponse($notamList);
                $httpService->sendArrayResponse($response->toRest());
                break;
            default:
                throw new InvalidArgumentException("no or unknown action defined: '" . $action . "'");
        }
    }
}
