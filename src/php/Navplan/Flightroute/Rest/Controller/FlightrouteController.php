<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Controller;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Flightroute\Domain\Service\IFlightrouteService;
use Navplan\Flightroute\Rest\Converter\RestCreateFlightrouteRequest;
use Navplan\Flightroute\Rest\Converter\RestCreateSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\Converter\RestCreateSharedFlightrouteRequestConverter;
use Navplan\Flightroute\Rest\Converter\RestDeleteFlightrouteRequest;
use Navplan\Flightroute\Rest\Converter\RestFlightrouteResponse;
use Navplan\Flightroute\Rest\Converter\RestReadFlightrouteListRequest;
use Navplan\Flightroute\Rest\Converter\RestReadFlightrouteListResponse;
use Navplan\Flightroute\Rest\Converter\RestReadFlightrouteRequest;
use Navplan\Flightroute\Rest\Converter\RestReadSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\Converter\RestSuccessResponse;
use Navplan\Flightroute\Rest\Converter\RestUpdateFlightrouteRequest;
use Navplan\System\DomainModel\HttpRequestMethod;
use Navplan\System\DomainService\IHttpService;


class FlightrouteController implements IRestController {
    public function __construct(
        private IFlightrouteService $flightrouteService,
        private IHttpService $httpService
    ) {
    }


    public function processRequest() {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($this->httpService->hasGetArg(RestReadSharedFlightrouteRequest::ARG_SHARE_ID)) {
                    // read shared flightroute
                    $request = RestReadSharedFlightrouteRequest::fromRest($this->httpService->getGetArgs());
                    $flightroute = $this->flightrouteService->readShared($request->shareId);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                } elseif ($this->httpService->hasGetArg(RestReadFlightrouteRequest::ARG_ID)) {
                    // read flightroute
                    $request = RestReadFlightrouteRequest::fromRest($this->httpService->getGetArgs());
                    $flightroute = $this->flightrouteService->read($request->flightrouteId, $request->token);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                } else {
                    // read flightroute list
                    $request = RestReadFlightrouteListRequest::fromRest($this->httpService->getGetArgs());
                    $flightrouteList = $this->flightrouteService->readList($request->token);
                    $response = new RestReadFlightrouteListResponse($flightrouteList);
                    $this->httpService->sendArrayResponse($response->toRest());
                }
                break;
            case HttpRequestMethod::POST:
                if ($this->httpService->hasPostArg(RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED)
                    && $this->httpService->getPostArgs()[RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED] === TRUE
                ) {
                    // create shared flightroute
                    $request = RestCreateSharedFlightrouteRequest::fromRest($this->httpService->getPostArgs());
                    $flightroute = $this->flightrouteService->createShared($request->flightroute);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                } else {
                    // create flightroute
                    $request = RestCreateFlightrouteRequest::fromRest($this->httpService->getPostArgs());
                    $flightroute = $this->flightrouteService->create($request->flightroute, $request->token);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                }
                break;
            case HttpRequestMethod::PUT:
                // update flightroute
                $request = RestUpdateFlightrouteRequest::fromRest($this->httpService->getPostArgs());
                $flightroute = $this->flightrouteService->update($request->flightroute, $request->token);
                $response = new RestFlightrouteResponse($flightroute);
                $this->httpService->sendArrayResponse($response->toRest());
                break;
            case HttpRequestMethod::DELETE:
                // delete flightroute
                $request = RestDeleteFlightrouteRequest::fromRest($this->httpService->getGetArgs());
                $success = $this->flightrouteService->delete($request->flightrouteId, $request->token);
                $this->httpService->sendArrayResponse(RestSuccessResponse::toRest($success));
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }
}
