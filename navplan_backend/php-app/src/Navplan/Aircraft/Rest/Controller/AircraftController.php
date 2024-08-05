<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Controller;

use InvalidArgumentException;
use Navplan\Aircraft\Domain\Service\IAircraftService;
use Navplan\Aircraft\Rest\Converter\RestAircraftResponse;
use Navplan\Aircraft\Rest\Converter\RestCreateAircraftRequest;
use Navplan\Aircraft\Rest\Converter\RestDeleteAircraftRequest;
use Navplan\Aircraft\Rest\Converter\RestDuplicateAircraftRequest;
use Navplan\Aircraft\Rest\Converter\RestReadAircraftListRequest;
use Navplan\Aircraft\Rest\Converter\RestReadAircraftListResponse;
use Navplan\Aircraft\Rest\Converter\RestReadAircraftRequest;
use Navplan\Aircraft\Rest\Converter\RestUpdateAircraftRequest;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Flightroute\Rest\Converter\RestSuccessResponse;
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
                    // read aircraft
                    $request = RestReadAircraftRequest::fromRest($this->httpService->getGetArgs());
                    $aircraft = $this->aircraftService->read($request->aircraftId, $request->token);
                    $response = new RestAircraftResponse($aircraft);
                    $this->httpService->sendArrayResponse($response->toRest());
                } else {
                    // read aircraft list
                    $request = RestReadAircraftListRequest::fromRest($this->httpService->getGetArgs());
                    $aircraftList = $this->aircraftService->readList($request->token);
                    $response = new RestReadAircraftListResponse($aircraftList);
                    $this->httpService->sendArrayResponse($response->toRest());
                }
                break;
            case HttpRequestMethod::POST:
                if ($this->httpService->hasPostArg(RestDuplicateAircraftRequest::ARG_ID)) {
                    // duplicate aircraft
                    $request = RestDuplicateAircraftRequest::fromRest($this->httpService->getPostArgs());
                    $aircraft = $this->aircraftService->duplicate($request->aircraftId, $request->token);
                    $response = new RestAircraftResponse($aircraft);
                    $this->httpService->sendArrayResponse($response->toRest());
                } else {
                    // create aircraft
                    $request = RestCreateAircraftRequest::fromRest($this->httpService->getPostArgs());
                    $aircraft = $this->aircraftService->create($request->aircraft, $request->token);
                    $response = new RestAircraftResponse($aircraft);
                    $this->httpService->sendArrayResponse($response->toRest());
                }
                break;
            case HttpRequestMethod::PUT:
                // update aircraft
                $request = RestUpdateAircraftRequest::fromRest($this->httpService->getPostArgs());
                $aircraft = $this->aircraftService->update($request->aircraft, $request->token);
                $response = new RestAircraftResponse($aircraft);
                $this->httpService->sendArrayResponse($response->toRest());
                break;
            case HttpRequestMethod::DELETE:
                // delete aircraft
                $request = RestDeleteAircraftRequest::fromRest($this->httpService->getGetArgs());
                $success = $this->aircraftService->delete($request->aircraftId, $request->token);
                $this->httpService->sendArrayResponse(RestSuccessResponse::toRest($success));
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }
}
