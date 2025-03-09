<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Notam\Domain\Service\INotamService;
use Navplan\Notam\Rest\Model\ReadNotamByExtentRequest;
use Navplan\Notam\Rest\Model\ReadNotamByIcaoRequest;
use Navplan\Notam\Rest\Model\ReadNotamByPositionRequest;
use Navplan\Notam\Rest\Model\ReadNotamResponse;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class NotamController implements IRestController
{
    public function __construct(
        private INotamService $notamService,
        private IHttpService $httpService
    )
    {
    }

    public function processRequest()
    {
        $getArgs = $this->httpService->getGetArgs();
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($this->httpService->hasGetArg(ReadNotamByIcaoRequest::ARG_ICAO)) {
                    $request = ReadNotamByIcaoRequest::fromRest($getArgs);
                    $notamList = $this->notamService->searchByIcao($request->airportIcao,
                        $request->minNotamTimestamp, $request->maxNotamTimestamp);
                    $response = new ReadNotamResponse($notamList);
                } else if ($this->httpService->hasGetArg(ReadNotamByPositionRequest::ARG_LAT)) {
                    $request = ReadNotamByPositionRequest::fromRest($getArgs);
                    $notamList = $this->notamService->searchByPosition($request->position,
                        $request->minNotamTimestamp, $request->maxNotamTimestamp);
                    $response = new ReadNotamResponse($notamList);
                } else {
                    $request = ReadNotamByExtentRequest::fromRest($getArgs);
                    $notamList = $this->notamService->searchByExtent($request->extent, $request->zoom,
                        $request->minNotamTimestamp, $request->maxNotamTimestamp);
                    $response = new ReadNotamResponse($notamList);
                }
                $this->httpService->sendArrayResponse($response->toRest());
                break;
            default:
                throw new InvalidArgumentException("invalid request'");
        }
    }
}
