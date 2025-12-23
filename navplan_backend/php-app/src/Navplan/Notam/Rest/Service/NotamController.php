<?php declare(strict_types=1);

namespace Navplan\Notam\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Notam\Domain\Service\INotamService;
use Navplan\Notam\Rest\Converter\RestNotamByExtentRequestConverter;
use Navplan\Notam\Rest\Converter\RestNotamByIcaoRequestConverter;
use Navplan\Notam\Rest\Converter\RestNotamByPositionRequestConverter;
use Navplan\Notam\Rest\Converter\RestNotamByRouteRequestConverter;
use Navplan\Notam\Rest\Converter\RestNotamResponseConverter;
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

    public function processRequest(): void
    {
        $getArgs = $this->httpService->getGetArgs();
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($this->httpService->hasGetArg(RestNotamByIcaoRequestConverter::ARG_ICAO)) {
                    $request = RestNotamByIcaoRequestConverter::fromRest($getArgs);
                    $notamList = $this->notamService->searchByIcao($request);
                    $response = new RestNotamResponseConverter($notamList);
                } else if ($this->httpService->hasGetArg(RestNotamByPositionRequestConverter::ARG_LAT)) {
                    $request = RestNotamByPositionRequestConverter::fromRest($getArgs);
                    $notamList = $this->notamService->searchByPosition($request);
                    $response = new RestNotamResponseConverter($notamList);
                } else {
                    $request = RestNotamByExtentRequestConverter::fromRest($getArgs);
                    $notamList = $this->notamService->searchByExtent($request);
                    $response = new RestNotamResponseConverter($notamList);
                }
                $this->httpService->sendArrayResponse($response->toRest());
                break;
            case HttpRequestMethod::POST:
                $postArgs = $this->httpService->getPostArgs();
                if ($this->httpService->hasPostArg(RestNotamByRouteRequestConverter::ARG_FLIGHTROUTE)) {
                    $request = RestNotamByRouteRequestConverter::fromRest($postArgs);
                    $notamList = $this->notamService->searchByRoute($request);
                    $response = new RestNotamResponseConverter($notamList);
                    $this->httpService->sendArrayResponse($response->toRest());
                } else {
                    throw new InvalidArgumentException("invalid POST request - flightroute required");
                }
                break;
            default:
                throw new InvalidArgumentException("invalid request'");
        }
    }
}
