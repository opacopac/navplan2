<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Controller;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestIdConverter;
use Navplan\Flightroute\Domain\Service\IFlightrouteService;
use Navplan\Flightroute\Rest\Converter\RestCreateFlightrouteRequest;
use Navplan\Flightroute\Rest\Converter\RestCreateSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\Converter\RestCreateSharedFlightrouteRequestConverter;
use Navplan\Flightroute\Rest\Converter\RestDuplicateFlightrouteRequest;
use Navplan\Flightroute\Rest\Converter\RestFlightrouteResponse;
use Navplan\Flightroute\Rest\Converter\RestReadFlightrouteListResponse;
use Navplan\Flightroute\Rest\Converter\RestReadSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\Converter\RestSuccessResponse;
use Navplan\Flightroute\Rest\Converter\RestUpdateFlightrouteRequest;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\User\Rest\Model\TokenRequestConverter;


class FlightrouteController implements IRestController
{
    public function __construct(
        private IFlightrouteService $flightrouteService,
        private IHttpService $httpService
    )
    {
    }


    public function processRequest()
    {
        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($this->httpService->hasGetArg(RestReadSharedFlightrouteRequest::ARG_SHARE_ID)) {
                    // TODO
                    // read shared flightroute
                    $request = RestReadSharedFlightrouteRequest::fromRest($this->httpService->getGetArgs());
                    $flightroute = $this->flightrouteService->readShared($request->shareId);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                } elseif ($this->httpService->hasGetArg(RestIdConverter::ARG_ID)) {
                    // read flightroute
                    $token = TokenRequestConverter::getToken($this->httpService->getCookies());
                    $flightrouteId = RestIdConverter::fromRest($this->httpService->getGetArgs());
                    $flightroute = $this->flightrouteService->read($flightrouteId, $token);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                } else {
                    // read flightroute list
                    $token = TokenRequestConverter::getToken($this->httpService->getCookies());
                    $flightrouteList = $this->flightrouteService->readList($token);
                    $response = new RestReadFlightrouteListResponse($flightrouteList);
                    $this->httpService->sendArrayResponse($response->toRest());
                }
                break;
            case HttpRequestMethod::POST:
                if ($this->httpService->hasPostArg(RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED)
                    && $this->httpService->getPostArgs()[RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED] === TRUE
                ) {
                    // TODO
                    // create shared flightroute
                    $request = RestCreateSharedFlightrouteRequest::fromRest($this->httpService->getPostArgs());
                    $flightroute = $this->flightrouteService->createShared($request->flightroute);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                } elseif (
                    $this->httpService->hasGetArg(RestDuplicateFlightrouteRequest::ARG_ACTION)
                    && $this->httpService->getGetArgs()[RestDuplicateFlightrouteRequest::ARG_ACTION] === RestDuplicateFlightrouteRequest::VAL_ACTION_DUPLICATE) {
                    // duplicate flightroute
                    $token = TokenRequestConverter::getToken($this->httpService->getCookies());
                    $flightrouteId = RestIdConverter::fromRest($this->httpService->getGetArgs());
                    $flightroute = $this->flightrouteService->duplicate($flightrouteId, $token);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                } else {
                    // create flightroute
                    $token = TokenRequestConverter::getToken($this->httpService->getCookies());
                    $request = RestCreateFlightrouteRequest::fromRest($this->httpService->getPostArgs());
                    $flightroute = $this->flightrouteService->create($request->flightroute, $token);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                }
                break;
            case HttpRequestMethod::PUT:
                // update flightroute
                $token = TokenRequestConverter::getToken($this->httpService->getCookies());
                $request = RestUpdateFlightrouteRequest::fromRest($this->httpService->getPostArgs());
                $flightroute = $this->flightrouteService->update($request->flightroute, $token);
                $response = new RestFlightrouteResponse($flightroute);
                $this->httpService->sendArrayResponse($response->toRest());
                break;
            case HttpRequestMethod::DELETE:
                // delete flightroute
                $token = TokenRequestConverter::getToken($this->httpService->getCookies());
                $flightrouteId = RestIdConverter::fromRest($this->httpService->getGetArgs());
                $success = $this->flightrouteService->delete($flightrouteId, $token);
                $this->httpService->sendArrayResponse(RestSuccessResponse::toRest($success));
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }
}
