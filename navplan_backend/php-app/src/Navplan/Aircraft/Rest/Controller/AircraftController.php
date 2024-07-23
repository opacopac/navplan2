<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Controller;

use InvalidArgumentException;
use Navplan\Aircraft\Domain\Service\IAircraftService;
use Navplan\Aircraft\Rest\Converter\RestAircraftResponse;
use Navplan\Aircraft\Rest\Converter\RestReadAircraftListRequest;
use Navplan\Aircraft\Rest\Converter\RestReadAircraftListResponse;
use Navplan\Aircraft\Rest\Converter\RestReadAircraftRequest;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;


class AircraftController implements IRestController
{
    public function __construct(
        private IAircraftService $aircraftService,
        private IHttpService $httpService
    )
    {
    }


    public function processRequest()
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($this->httpService->hasGetArg(RestReadAircraftRequest::ARG_ID)) {
                    // read flightroute
                    $request = RestReadAircraftRequest::fromRest($this->httpService->getGetArgs());
                    $aircraft = $this->aircraftService->read($request->aircraftId, $request->token);
                    $response = new RestAircraftResponse($aircraft);
                    $this->httpService->sendArrayResponse($response->toRest());
                } else {
                    // read flightroute list
                    $request = RestReadAircraftListRequest::fromRest($this->httpService->getGetArgs());
                    $aircraftList = $this->aircraftService->readList($request->token);
                    $response = new RestReadAircraftListResponse($aircraftList);
                    $this->httpService->sendArrayResponse($response->toRest());
                }
                break;
            case HttpRequestMethod::POST:
                /*if ($this->httpService->hasPostArg(RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED)
                    && $this->httpService->getPostArgs()[RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED] === TRUE
                ) {
                    // create shared flightroute
                    $request = RestCreateSharedFlightrouteRequest::fromRest($this->httpService->getPostArgs());
                    $flightroute = $this->aircraftService->createShared($request->flightroute);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                } else {
                    // create flightroute
                    $request = RestCreateFlightrouteRequest::fromRest($this->httpService->getPostArgs());
                    $flightroute = $this->aircraftService->create($request->flightroute, $request->token);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                }*/
                break;
            case HttpRequestMethod::PUT:
                // update flightroute
                /*$request = RestUpdateFlightrouteRequest::fromRest($this->httpService->getPostArgs());
                $flightroute = $this->aircraftService->update($request->flightroute, $request->token);
                $response = new RestFlightrouteResponse($flightroute);
                $this->httpService->sendArrayResponse($response->toRest());*/
                break;
            case HttpRequestMethod::DELETE:
                // delete flightroute
                /*$request = RestDeleteFlightrouteRequest::fromRest($this->httpService->getGetArgs());
                $success = $this->aircraftService->delete($request->flightrouteId, $request->token);
                $this->httpService->sendArrayResponse(RestSuccessResponse::toRest($success));*/
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }
}
