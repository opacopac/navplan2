<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Controller;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestActionConverter;
use Navplan\Common\Rest\Converter\RestIdConverter;
use Navplan\Flightroute\Domain\Service\IFlightrouteService;
use Navplan\Flightroute\Rest\Converter\RestCreateSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\Converter\RestCreateSharedFlightrouteRequestConverter;
use Navplan\Flightroute\Rest\Converter\RestFlightrouteRequest;
use Navplan\Flightroute\Rest\Converter\RestFlightrouteResponse;
use Navplan\Flightroute\Rest\Converter\RestReadFlightrouteListResponse;
use Navplan\Flightroute\Rest\Converter\RestReadSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\Converter\RestSuccessResponse;
use Navplan\System\Domain\Model\HttpRequestMethod;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\User\Rest\Model\RestTokenConverter;


class FlightrouteController implements IRestController
{
    const ARG_ACTION_DUPLICATE = "duplicate";


    public function __construct(
        private IFlightrouteService $flightrouteService,
        private IHttpService        $httpService
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
                if ($this->httpService->hasGetArg(RestReadSharedFlightrouteRequest::ARG_SHARE_ID)) {
                    // TODO => move to separate controller
                    // read shared flightroute
                    $request = RestReadSharedFlightrouteRequest::fromRest($this->httpService->getGetArgs());
                    $flightroute = $this->flightrouteService->readShared($request->shareId);
                    $response = new RestFlightrouteResponse($flightroute);
                } elseif ($id) {
                    // read flightroute
                    $flightroute = $this->flightrouteService->read($id, $token);
                    $response = new RestFlightrouteResponse($flightroute);
                } else {
                    // read flightroute list
                    $flightrouteList = $this->flightrouteService->readList($token);
                    $response = new RestReadFlightrouteListResponse($flightrouteList);
                }
                $this->httpService->sendArrayResponse($response->toRest());
                break;
            case HttpRequestMethod::POST:
                if ($this->httpService->hasPostArg(RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED)
                    && $this->httpService->getPostArgs()[RestCreateSharedFlightrouteRequestConverter::ARG_CREATE_SHARED] === TRUE
                ) {
                    // TODO => move to separate controller
                    // create shared flightroute
                    $request = RestCreateSharedFlightrouteRequest::fromRest($this->httpService->getPostArgs());
                    $flightroute = $this->flightrouteService->createShared($request->flightroute);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                } elseif ($action === self::ARG_ACTION_DUPLICATE && $id) {
                    // duplicate flightroute
                    $flightroute = $this->flightrouteService->duplicate($id, $token);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                } else {
                    // create flightroute
                    $request = RestFlightrouteRequest::fromRest($this->httpService->getPostArgs());
                    $flightroute = $this->flightrouteService->create($request->flightroute, $token);
                    $response = new RestFlightrouteResponse($flightroute);
                    $this->httpService->sendArrayResponse($response->toRest());
                }
                break;
            case HttpRequestMethod::PUT:
                // update flightroute
                $request = RestFlightrouteRequest::fromRest($this->httpService->getPostArgs());
                $flightroute = $this->flightrouteService->update($request->flightroute, $token);
                $response = new RestFlightrouteResponse($flightroute);
                $this->httpService->sendArrayResponse($response->toRest());
                break;
            case HttpRequestMethod::DELETE:
                // delete flightroute
                $success = $this->flightrouteService->delete($id, $token);
                $this->httpService->sendArrayResponse(RestSuccessResponse::toRest($success));
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }
}
