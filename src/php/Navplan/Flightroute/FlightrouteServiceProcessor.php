<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use InvalidArgumentException;
use Navplan\Flightroute\Domain\FlightrouteListResponse;
use Navplan\Flightroute\Domain\FlightrouteResponse;
use Navplan\Flightroute\UseCase\CreateFlightroute;
use Navplan\Flightroute\UseCase\CreateSharedFlightroute;
use Navplan\Flightroute\UseCase\DeleteFlightroute;
use Navplan\Flightroute\UseCase\ReadFlightrouteList;
use Navplan\Flightroute\UseCase\ReadFlightroute;
use Navplan\Flightroute\UseCase\ReadSharedFlightroute;
use Navplan\Flightroute\UseCase\UpdateFlightroute;
use Navplan\Search\UseCase\IFlightrouteConfig;
use Navplan\Shared\RequestResponseHelper;
use Navplan\System\IHttpResponseService;
use Navplan\User\Rest\RestCreateFlightrouteRequest;
use Navplan\User\Rest\RestCreateSharedFlightrouteRequest;
use Navplan\User\Rest\RestDeleteFlightrouteRequest;
use Navplan\User\Rest\RestFlightrouteListResponse;
use Navplan\User\Rest\RestFlightrouteResponse;
use Navplan\User\Rest\RestReadFlightrouteListRequest;
use Navplan\User\Rest\RestReadFlightrouteRequest;
use Navplan\User\Rest\RestReadSharedFlightrouteRequest;
use Navplan\User\Rest\RestUpdateFlightrouteRequest;


class FlightrouteServiceProcessor {
    const REQ_METHOD_GET = "GET";
    const REQ_METHOD_POST = "POST";
    const REQ_METHOD_PUT = "PUT";
    const REQ_METHOD_DELETE = "DELETE";
    const ARG_SHARE_ID = "shareid";
    const ARG_ID = "id";
    const ARG_CREATE_SHARED = "createShared";


    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, IFlightrouteConfig $config) {
        switch ($requestMethod) {
            case self::REQ_METHOD_GET:
                if (isset($getVars[self::ARG_SHARE_ID])) {
                    $request = RestReadSharedFlightrouteRequest::fromArgs($getVars);
                    $response = (new ReadSharedFlightroute($config))->read($request);
                    self::sendFlighrouteResponse($response, $config->getHttpResponseService());
                } elseif (isset($getVars[self::ARG_ID])) {
                    $request = RestReadFlightrouteRequest::fromArgs($getVars);
                    $response = (new ReadFlightroute($config))->read($request);
                    self::sendFlighrouteResponse($response, $config->getHttpResponseService());
                } else {
                    $request = RestReadFlightrouteListRequest::fromArgs($getVars);
                    $response = (new ReadFlightrouteList($config))->read($request);
                    self::sendFlighrouteListResponse($response, $config->getHttpResponseService());
                }
                break;
            case self::REQ_METHOD_POST:
                if (isset($postVars[self::ARG_CREATE_SHARED]) && $postVars[self::ARG_CREATE_SHARED] === TRUE) {
                    $request = RestCreateSharedFlightrouteRequest::fromArgs($getVars);
                    $response = (new CreateSharedFlightroute($config))->create($request);
                    self::sendFlighrouteResponse($response, $config->getHttpResponseService());
                } else {
                    $request = RestCreateFlightrouteRequest::fromArgs($getVars);
                    $response = (new CreateFlightroute($config))->create($request);
                    self::sendFlighrouteResponse($response, $config->getHttpResponseService());
                }
                break;
            case self::REQ_METHOD_PUT:
                $request = RestUpdateFlightrouteRequest::fromArgs($getVars);
                $response = (new UpdateFlightroute($config))->update($request);
                self::sendFlighrouteResponse($response, $config->getHttpResponseService());
                break;
            case self::REQ_METHOD_DELETE:
                $request = RestDeleteFlightrouteRequest::fromArgs($getVars);
                (new DeleteFlightroute($config))->delete($request);
                self::sendSuccessResponse($config->getHttpResponseService());
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }


    private static function sendFlighrouteResponse(FlightrouteResponse $response, IHttpResponseService $httpService) {
        $resultArray = RestFlightrouteResponse::toArray($response);
        RequestResponseHelper::sendArrayResponse($httpService, $resultArray);
    }


    private static function sendFlighrouteListResponse(FlightrouteListResponse $response, IHttpResponseService $httpService) {
        $resultArray = RestFlightrouteListResponse::toArray($response);
        RequestResponseHelper::sendArrayResponse($httpService, $resultArray);
    }


    private static function sendSuccessResponse(IHttpResponseService $httpService) {
        $resultArray = array("success" => 1);
        RequestResponseHelper::sendArrayResponse($httpService, $resultArray);
    }
}
