<?php declare(strict_types=1);

namespace Navplan\Aircraft\Rest\Controller;

use InvalidArgumentException;
use Navplan\Aircraft\Domain\Service\IAircraftService;
use Navplan\Aircraft\Rest\Converter\RestAircraftResponse;
use Navplan\Aircraft\Rest\Converter\RestCreateAircraftRequest;
use Navplan\Aircraft\Rest\Converter\RestReadAircraftListResponse;
use Navplan\Aircraft\Rest\Converter\RestUpdateAircraftRequest;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestActionConverter;
use Navplan\Common\Rest\Converter\RestIdConverter;
use Navplan\Flightroute\Rest\Converter\RestSuccessResponse;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\User\Rest\Model\RestTokenConverter;


class AircraftController implements IRestController
{
    const ARG_ACTION_DUPLICATE = "duplicate";


    public function __construct(
        private IAircraftService $aircraftService,
        private IHttpService     $httpService
    )
    {
    }


    public function processRequest()
    {
        $id = RestIdConverter::getIdOrNull($this->httpService->getGetArgs());
        $action = RestActionConverter::getActionOrNull($this->httpService->getGetArgs());
        $token = RestTokenConverter::getTokenOrNull($this->httpService->getCookies());

        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                if ($id) {
                    // read aircraft
                    $aircraft = $this->aircraftService->read($id, $token);
                    $response = new RestAircraftResponse($aircraft);
                    $this->httpService->sendArrayResponse($response->toRest());
                } else {
                    // read aircraft list
                    $aircraftList = $this->aircraftService->readList($token);
                    $response = new RestReadAircraftListResponse($aircraftList);
                    $this->httpService->sendArrayResponse($response->toRest());
                }
                break;
            case HttpRequestMethod::POST:
                if ($action === self::ARG_ACTION_DUPLICATE && $id) {
                    // duplicate aircraft
                    $aircraft = $this->aircraftService->duplicate($id, $token);
                    $response = new RestAircraftResponse($aircraft);
                    $this->httpService->sendArrayResponse($response->toRest());
                } else {
                    // create aircraft
                    $request = RestCreateAircraftRequest::fromRest($this->httpService->getPostArgs());
                    $aircraft = $this->aircraftService->create($request->aircraft, $token);
                    $response = new RestAircraftResponse($aircraft);
                    $this->httpService->sendArrayResponse($response->toRest());
                }
                break;
            case HttpRequestMethod::PUT:
                // update aircraft
                $request = RestUpdateAircraftRequest::fromRest($this->httpService->getPostArgs());
                $aircraft = $this->aircraftService->update($request->aircraft, $token);
                $response = new RestAircraftResponse($aircraft);
                $this->httpService->sendArrayResponse($response->toRest());
                break;
            case HttpRequestMethod::DELETE:
                // delete aircraft
                $success = $this->aircraftService->delete($id, $token);
                $this->httpService->sendArrayResponse(RestSuccessResponse::toRest($success));
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }
}
