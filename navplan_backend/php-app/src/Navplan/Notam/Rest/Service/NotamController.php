<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Service;

use InvalidArgumentException;
use Navplan\Notam\Domain\Service\INotamService;
use Navplan\Notam\Rest\Model\ReadNotamByExtentRequest;
use Navplan\Notam\Rest\Model\ReadNotamByIcaoRequest;
use Navplan\Notam\Rest\Model\ReadNotamByPositionRequest;
use Navplan\Notam\Rest\Model\ReadNotamResponse;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class NotamController
{
    public static function processRequest(
        INotamService $notamService,
        IHttpService $httpService
    )
    {
        $getArgs = $httpService->getGetArgs();
        switch ($httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($httpService->hasGetArg(ReadNotamByIcaoRequest::ARG_ICAO)) {
                    $request = ReadNotamByIcaoRequest::fromRest($getArgs);
                    $notamList = $notamService->searchByIcao($request->airportIcao, $request->minNotamTimestamp, $request->maxNotamTimestamp);
                    $response = new ReadNotamResponse($notamList);
                    $httpService->sendArrayResponse($response->toRest());
                } else if ($httpService->hasGetArg(ReadNotamByPositionRequest::ARG_LAT)) {
                    $request = ReadNotamByPositionRequest::fromRest($getArgs);
                    $notamList = $notamService->searchByPosition($request->position, $request->minNotamTimestamp, $request->maxNotamTimestamp);
                    $response = new ReadNotamResponse($notamList);
                    $httpService->sendArrayResponse($response->toRest());
                } else {
                    $request = ReadNotamByExtentRequest::fromRest($getArgs);
                    $notamList = $notamService->searchByExtent($request->extent, $request->zoom, $request->minNotamTimestamp, $request->maxNotamTimestamp);
                    $response = new ReadNotamResponse($notamList);
                    $httpService->sendArrayResponse($response->toRest());
                }
                break;
            default:
                throw new InvalidArgumentException("invalid request'");
        }
    }
}
