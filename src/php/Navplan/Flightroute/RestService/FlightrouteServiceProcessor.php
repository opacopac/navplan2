<?php declare(strict_types=1);

namespace Navplan\Flightroute\RestService;

use InvalidArgumentException;
use Navplan\Flightroute\RestModel\RestCreateFlightrouteRequest;
use Navplan\Flightroute\RestModel\RestCreateSharedFlightrouteRequest;
use Navplan\Flightroute\RestModel\RestCreateSharedFlightrouteRequestConverter;
use Navplan\Flightroute\RestModel\RestDeleteFlightrouteRequest;
use Navplan\Flightroute\RestModel\RestFlightrouteResponse;
use Navplan\Flightroute\RestModel\RestReadFlightrouteListRequest;
use Navplan\Flightroute\RestModel\RestReadFlightrouteListResponse;
use Navplan\Flightroute\RestModel\RestReadFlightrouteRequest;
use Navplan\Flightroute\RestModel\RestReadSharedFlightrouteRequest;
use Navplan\Flightroute\RestModel\RestSuccessResponse;
use Navplan\Flightroute\RestModel\RestUpdateFlightrouteRequest;
use Navplan\System\DomainModel\HttpRequestMethod;


class FlightrouteServiceProcessor {
    public static function processRequest(IFlightrouteServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $flightrouteService = $diContainer->getFlightrouteService();
        switch ($httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($httpService->hasGetArg(RestReadSharedFlightrouteRequest::ARG_SHARE_ID)) {
                    // read shared flightroute
                    $request = RestReadSharedFlightrouteRequest::fromRest($httpService->getGetArgs());
                    $flightroute = $flightrouteService->readShared($request->shareId);
                    $response = new RestFlightrouteResponse($flightroute);
                    $httpService->sendArrayResponse($response->toRest());
                } elseif ($httpService->hasGetArg(RestReadFlightrouteRequest::ARG_ID)) {
                    // read flightroute
                    $request = RestReadFlightrouteRequest::fromRest($httpService->getGetArgs());
                    $flightroute = $flightrouteService->read($request->flightrouteId, $request->token);
                    $response = new RestFlightrouteResponse($flightroute);
                    $httpService->sendArrayResponse($response->toRest());
                } else {
                    // read flightroute list
                    $request = RestReadFlightrouteListRequest::fromRest($httpService->getGetArgs());
                    $flightrouteList = $flightrouteService->readList($request->token);
                    $response = new RestReadFlightrouteListResponse($flightrouteList);
                    $httpService->sendArrayResponse($response->toRest());
                }
                break;
            case HttpRequestMethod::POST:
                if ($httpService->hasPostArg(RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED)
                    && $httpService->getPostArgs()[RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED] === TRUE
                ) {
                    // create shared flightroute
                    $request = RestCreateSharedFlightrouteRequest::fromRest($httpService->getPostArgs());
                    $flightroute = $flightrouteService->createShared($request->flightroute);
                    $response = new RestFlightrouteResponse($flightroute);
                    $httpService->sendArrayResponse($response->toRest());
                } else {
                    // create flightroute
                    $request = RestCreateFlightrouteRequest::fromRest($httpService->getPostArgs());
                    $flightroute = $flightrouteService->create($request->flightroute, $request->token);
                    $response = new RestFlightrouteResponse($flightroute);
                    $httpService->sendArrayResponse($response->toRest());
                }
                break;
            case HttpRequestMethod::PUT:
                // update flightroute
                $request = RestUpdateFlightrouteRequest::fromRest($httpService->getPostArgs());
                $flightroute = $flightrouteService->update($request->flightroute, $request->token);
                $response = new RestFlightrouteResponse($flightroute);
                $httpService->sendArrayResponse($response->toRest());
                break;
            case HttpRequestMethod::DELETE:
                // delete flightroute
                $request = RestDeleteFlightrouteRequest::fromRest($httpService->getGetArgs());
                $success = $flightrouteService->delete($request->flightrouteId, $request->token);
                $httpService->sendArrayResponse(RestSuccessResponse::toRest()); // TODO: always success
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }
}
