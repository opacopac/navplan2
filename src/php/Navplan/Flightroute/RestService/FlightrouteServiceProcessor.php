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


class FlightrouteServiceProcessor {
    const REQ_METHOD_GET = "GET";
    const REQ_METHOD_POST = "POST";
    const REQ_METHOD_PUT = "PUT";
    const REQ_METHOD_DELETE = "DELETE";


    public static function processRequest(
        string $requestMethod,
        ?array $getVars,
        ?array $postVars,
        IFlightrouteServiceDiContainer $diContainer
    ) {
        $httpService = $diContainer->getHttpService();
        switch ($requestMethod) {
            case self::REQ_METHOD_GET:
                if (isset($getVars[RestReadSharedFlightrouteRequestConverter::ARG_SHARE_ID])) {
                    $request = RestReadSharedFlightrouteRequestConverter::fromArgs($getVars);
                    $response = $diContainer->getReadSharedFlightrouteUc()->read($request);
                    $httpService->sendArrayResponse(RestFlightrouteResponseConverter::toRest($response));
                } elseif (isset($getVars[RestReadFlightrouteRequestConverter::ARG_ID])) {
                    $request = RestReadFlightrouteRequestConverter::fromArgs($getVars);
                    $response = $diContainer->getReadFlightrouteUc()->read($request);
                    $httpService->sendArrayResponse(RestFlightrouteResponseConverter::toRest($response));
                } else {
                    $request = RestReadFlightrouteListRequestConverter::fromArgs($getVars);
                    $response = $diContainer->getReadFlightrouteListUc()->read($request);
                    $httpService->sendArrayResponse(RestFlightrouteListResponseConverter::toRest($response));
                }
                break;
            case self::REQ_METHOD_POST:
                if (isset($postVars[RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED]) && $postVars[RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED] === TRUE) {
                    $request = RestCreateSharedFlightrouteRequestConverter::fromArgs($postVars);
                    $response = $diContainer->getCreateSharedFlightrouteUc()->create($request);
                    $httpService->sendArrayResponse(RestFlightrouteResponseConverter::toRest($response));
                } else {
                    $request = RestCreateFlightrouteRequestConverter::fromArgs($postVars);
                    $response = $diContainer->getCreateFlightrouteUc()->create($request);
                    $httpService->sendArrayResponse(RestFlightrouteResponseConverter::toRest($response));
                }
                break;
            case self::REQ_METHOD_PUT:
                $request = RestUpdateFlightrouteRequestConverter::fromArgs($postVars);
                $response = $diContainer->getUpdateFlightrouteUc()->update($request);
                $httpService->sendArrayResponse(RestFlightrouteResponseConverter::toRest($response));
                break;
            case self::REQ_METHOD_DELETE:
                $request = RestDeleteFlightrouteRequestConverter::fromArgs($getVars);
                $diContainer->getDeleteFlightrouteUc()->delete($request);
                $httpService->sendArrayResponse(RestSuccessResponseConverter::toRest());
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }
}
