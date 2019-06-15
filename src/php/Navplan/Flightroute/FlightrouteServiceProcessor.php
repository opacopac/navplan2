<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use InvalidArgumentException;
use Navplan\Flightroute\Rest\RestCreateFlightrouteRequest;
use Navplan\Flightroute\Rest\RestCreateSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\RestDeleteFlightrouteRequest;
use Navplan\Flightroute\Rest\RestFlightrouteListResponse;
use Navplan\Flightroute\Rest\RestFlightrouteResponse;
use Navplan\Flightroute\Rest\RestReadFlightrouteListRequest;
use Navplan\Flightroute\Rest\RestReadFlightrouteRequest;
use Navplan\Flightroute\Rest\RestReadSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\RestSuccessResponse;
use Navplan\Flightroute\Rest\RestUpdateFlightrouteRequest;
use Navplan\Flightroute\UseCase\CreateFlightroute;
use Navplan\Flightroute\UseCase\CreateSharedFlightroute;
use Navplan\Flightroute\UseCase\DeleteFlightroute;
use Navplan\Flightroute\UseCase\ReadFlightrouteList;
use Navplan\Flightroute\UseCase\ReadFlightroute;
use Navplan\Flightroute\UseCase\ReadSharedFlightroute;
use Navplan\Flightroute\UseCase\UpdateFlightroute;
use Navplan\Flightroute\UseCase\IFlightrouteConfig;


class FlightrouteServiceProcessor {
    const REQ_METHOD_GET = "GET";
    const REQ_METHOD_POST = "POST";
    const REQ_METHOD_PUT = "PUT";
    const REQ_METHOD_DELETE = "DELETE";


    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, IFlightrouteConfig $config) {
        $httpService = $config->getSystemServiceFactory()->getHttpService();
        switch ($requestMethod) {
            case self::REQ_METHOD_GET:
                if (isset($getVars[RestReadSharedFlightrouteRequest::ARG_SHARE_ID])) {
                    $request = RestReadSharedFlightrouteRequest::fromArgs($getVars);
                    $response = (new ReadSharedFlightroute($config))->read($request);
                    $httpService->sendArrayResponse(RestFlightrouteResponse::toRest($response));
                } elseif (isset($getVars[RestReadFlightrouteRequest::ARG_ID])) {
                    $request = RestReadFlightrouteRequest::fromArgs($getVars);
                    $response = (new ReadFlightroute($config))->read($request);
                    $httpService->sendArrayResponse(RestFlightrouteResponse::toRest($response));
                } else {
                    $request = RestReadFlightrouteListRequest::fromArgs($getVars);
                    $response = (new ReadFlightrouteList($config))->read($request);
                    $httpService->sendArrayResponse(RestFlightrouteListResponse::toRest($response));
                }
                break;
            case self::REQ_METHOD_POST:
                if (isset($postVars[RestCreateSharedFlightrouteRequest::ARG_CREATE_SHARED]) && $postVars[RestCreateSharedFlightrouteRequest::ARG_CREATE_SHARED] === TRUE) {
                    $request = RestCreateSharedFlightrouteRequest::fromArgs($postVars);
                    $response = (new CreateSharedFlightroute($config))->create($request);
                    $httpService->sendArrayResponse(RestFlightrouteResponse::toRest($response));
                } else {
                    $request = RestCreateFlightrouteRequest::fromArgs($postVars);
                    $response = (new CreateFlightroute($config))->create($request);
                    $httpService->sendArrayResponse(RestFlightrouteResponse::toRest($response));
                }
                break;
            case self::REQ_METHOD_PUT:
                $request = RestUpdateFlightrouteRequest::fromArgs($postVars);
                $response = (new UpdateFlightroute($config))->update($request);
                $httpService->sendArrayResponse(RestFlightrouteResponse::toRest($response));
                break;
            case self::REQ_METHOD_DELETE:
                $request = RestDeleteFlightrouteRequest::fromArgs($getVars);
                (new DeleteFlightroute($config))->delete($request);
                $httpService->sendArrayResponse(RestSuccessResponse::toRest());
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }
}
