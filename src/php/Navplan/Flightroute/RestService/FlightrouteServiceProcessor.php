<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestService;

use InvalidArgumentException;
use Navplan\Flightroute\RestModel\RestCreateFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\RestCreateSharedFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\RestDeleteFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\RestFlightrouteListResponseConverter;
use Navplan\Flightroute\RestModel\RestFlightrouteResponseConverter;
use Navplan\Flightroute\RestModel\RestReadFlightrouteListRequestConverter;
use Navplan\Flightroute\RestModel\RestReadFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\RestReadSharedFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\RestSuccessResponseConverter;
use Navplan\Flightroute\RestModel\RestUpdateFlightrouteRequestConverter;
use Navplan\System\DomainModel\HttpRequestMethod;


class FlightrouteServiceProcessor {
    public static function processRequest(IFlightrouteServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        switch ($httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($httpService->hasGetArg(RestReadSharedFlightrouteRequestConverter::ARG_SHARE_ID)) {
                    $request = RestReadSharedFlightrouteRequestConverter::fromArgs($httpService->getGetArgs());
                    $response = $diContainer->getReadSharedFlightrouteUc()->read($request);
                    $httpService->sendArrayResponse(RestFlightrouteResponseConverter::toRest($response));
                } elseif ($httpService->hasGetArg(RestReadFlightrouteRequestConverter::ARG_ID)) {
                    $request = RestReadFlightrouteRequestConverter::fromArgs($httpService->getGetArgs());
                    $response = $diContainer->getReadFlightrouteUc()->read($request);
                    $httpService->sendArrayResponse(RestFlightrouteResponseConverter::toRest($response));
                } else {
                    $request = RestReadFlightrouteListRequestConverter::fromArgs($httpService->getGetArgs());
                    $response = $diContainer->getReadFlightrouteListUc()->read($request);
                    $httpService->sendArrayResponse(RestFlightrouteListResponseConverter::toRest($response));
                }
                break;
            case HttpRequestMethod::POST:
                if ($httpService->hasPostArg(RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED)
                    && $httpService->getPostArgs()[RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED] === TRUE) {
                    $request = RestCreateSharedFlightrouteRequestConverter::fromArgs($httpService->getPostArgs());
                    $response = $diContainer->getCreateSharedFlightrouteUc()->create($request);
                    $httpService->sendArrayResponse(RestFlightrouteResponseConverter::toRest($response));
                } else {
                    $request = RestCreateFlightrouteRequestConverter::fromArgs($httpService->getPostArgs());
                    $response = $diContainer->getCreateFlightrouteUc()->create($request);
                    $httpService->sendArrayResponse(RestFlightrouteResponseConverter::toRest($response));
                }
                break;
            case HttpRequestMethod::PUT:
                $request = RestUpdateFlightrouteRequestConverter::fromArgs($httpService->getPostArgs());
                $response = $diContainer->getUpdateFlightrouteUc()->update($request);
                $httpService->sendArrayResponse(RestFlightrouteResponseConverter::toRest($response));
                break;
            case HttpRequestMethod::DELETE:
                $request = RestDeleteFlightrouteRequestConverter::fromArgs($httpService->getGetArgs());
                $diContainer->getDeleteFlightrouteUc()->delete($request);
                $httpService->sendArrayResponse(RestSuccessResponseConverter::toRest());
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }
}
