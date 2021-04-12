<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestService;

use InvalidArgumentException;
use Navplan\Flightroute\RestModel\CreateFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\CreateSharedFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\DeleteFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\FlightrouteListResponseConverter;
use Navplan\Flightroute\RestModel\FlightrouteResponseConverter;
use Navplan\Flightroute\RestModel\ReadFlightrouteListRequestConverter;
use Navplan\Flightroute\RestModel\ReadFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\ReadSharedFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\SuccessResponseConverter;
use Navplan\Flightroute\RestModel\UpdateFlightrouteRequestConverter;


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
                if (isset($getVars[ReadSharedFlightrouteRequestConverter::ARG_SHARE_ID])) {
                    $request = ReadSharedFlightrouteRequestConverter::fromArgs($getVars);
                    $response = $diContainer->getReadSharedFlightrouteUc()->read($request);
                    $httpService->sendArrayResponse(FlightrouteResponseConverter::toRest($response));
                } elseif (isset($getVars[ReadFlightrouteRequestConverter::ARG_ID])) {
                    $request = ReadFlightrouteRequestConverter::fromArgs($getVars);
                    $response = $diContainer->getReadFlightrouteUc()->read($request);
                    $httpService->sendArrayResponse(FlightrouteResponseConverter::toRest($response));
                } else {
                    $request = ReadFlightrouteListRequestConverter::fromArgs($getVars);
                    $response = $diContainer->getReadFlightrouteListUc()->read($request);
                    $httpService->sendArrayResponse(FlightrouteListResponseConverter::toRest($response));
                }
                break;
            case self::REQ_METHOD_POST:
                if (isset($postVars[CreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED]) && $postVars[CreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED] === TRUE) {
                    $request = CreateSharedFlightrouteRequestConverter::fromArgs($postVars);
                    $response = $diContainer->getCreateSharedFlightrouteUc()->create($request);
                    $httpService->sendArrayResponse(FlightrouteResponseConverter::toRest($response));
                } else {
                    $request = CreateFlightrouteRequestConverter::fromArgs($postVars);
                    $response = $diContainer->getCreateFlightrouteUc()->create($request);
                    $httpService->sendArrayResponse(FlightrouteResponseConverter::toRest($response));
                }
                break;
            case self::REQ_METHOD_PUT:
                $request = UpdateFlightrouteRequestConverter::fromArgs($postVars);
                $response = $diContainer->getUpdateFlightrouteUc()->update($request);
                $httpService->sendArrayResponse(FlightrouteResponseConverter::toRest($response));
                break;
            case self::REQ_METHOD_DELETE:
                $request = DeleteFlightrouteRequestConverter::fromArgs($getVars);
                $diContainer->getDeleteFlightrouteUc()->delete($request);
                $httpService->sendArrayResponse(SuccessResponseConverter::toRest());
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }
}
