<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use InvalidArgumentException;
use Navplan\Flightroute\Domain\FlightrouteListResponse;
use Navplan\Flightroute\Domain\FlightrouteResponse;
use Navplan\Flightroute\Rest\RestCreateFlightrouteRequest;
use Navplan\Flightroute\Rest\RestCreateSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\RestDeleteFlightrouteRequest;
use Navplan\Flightroute\Rest\RestFlightrouteListResponse;
use Navplan\Flightroute\Rest\RestFlightrouteResponse;
use Navplan\Flightroute\Rest\RestReadFlightrouteListRequest;
use Navplan\Flightroute\Rest\RestReadFlightrouteRequest;
use Navplan\Flightroute\Rest\RestReadSharedFlightrouteRequest;
use Navplan\Flightroute\Rest\RestUpdateFlightrouteRequest;
use Navplan\Flightroute\UseCase\CreateFlightroute;
use Navplan\Flightroute\UseCase\CreateSharedFlightroute;
use Navplan\Flightroute\UseCase\DeleteFlightroute;
use Navplan\Flightroute\UseCase\ReadFlightrouteList;
use Navplan\Flightroute\UseCase\ReadFlightroute;
use Navplan\Flightroute\UseCase\ReadSharedFlightroute;
use Navplan\Flightroute\UseCase\UpdateFlightroute;
use Navplan\Flightroute\UseCase\IFlightrouteConfig;
use Navplan\Shared\RequestResponseHelper;
use Navplan\System\IHttpService;


class FlightrouteServiceProcessor {
    const REQ_METHOD_GET = "GET";
    const REQ_METHOD_POST = "POST";
    const REQ_METHOD_PUT = "PUT";
    const REQ_METHOD_DELETE = "DELETE";


    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, IFlightrouteConfig $config) {
        switch ($requestMethod) {
            case self::REQ_METHOD_GET:
                if (isset($getVars[RestReadSharedFlightrouteRequest::ARG_SHARE_ID])) {
                    $request = RestReadSharedFlightrouteRequest::fromArgs($getVars);
                    $response = (new ReadSharedFlightroute($config))->read($request);
                    self::sendFlighrouteResponse($response, $config->getHttpService());
                } elseif (isset($getVars[RestReadFlightrouteRequest::ARG_ID])) {
                    $request = RestReadFlightrouteRequest::fromArgs($getVars);
                    $response = (new ReadFlightroute($config))->read($request);
                    self::sendFlighrouteResponse($response, $config->getHttpService());
                } else {
                    $request = RestReadFlightrouteListRequest::fromArgs($getVars);
                    $response = (new ReadFlightrouteList($config))->read($request);
                    self::sendFlighrouteListResponse($response, $config->getHttpService());
                }
                break;
            case self::REQ_METHOD_POST:
                if (isset($postVars[RestCreateSharedFlightrouteRequest::ARG_CREATE_SHARED]) && $postVars[RestCreateSharedFlightrouteRequest::ARG_CREATE_SHARED] === TRUE) {
                    $request = RestCreateSharedFlightrouteRequest::fromArgs($postVars);
                    $response = (new CreateSharedFlightroute($config))->create($request);
                    self::sendFlighrouteResponse($response, $config->getHttpService());
                } else {
                    $request = RestCreateFlightrouteRequest::fromArgs($postVars);
                    $response = (new CreateFlightroute($config))->create($request);
                    self::sendFlighrouteResponse($response, $config->getHttpService());
                }
                break;
            case self::REQ_METHOD_PUT:
                $request = RestUpdateFlightrouteRequest::fromArgs($postVars);
                $response = (new UpdateFlightroute($config))->update($request);
                self::sendFlighrouteResponse($response, $config->getHttpService());
                break;
            case self::REQ_METHOD_DELETE:
                $request = RestDeleteFlightrouteRequest::fromArgs($getVars);
                (new DeleteFlightroute($config))->delete($request);
                self::sendSuccessResponse($config->getHttpService());
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }


    private static function sendFlighrouteResponse(FlightrouteResponse $response, IHttpService $httpService) {
        $resultArray = RestFlightrouteResponse::toArray($response);
        RequestResponseHelper::sendArrayResponse($httpService, $resultArray);
    }


    private static function sendFlighrouteListResponse(FlightrouteListResponse $response, IHttpService $httpService) {
        $resultArray = RestFlightrouteListResponse::toArray($response);
        RequestResponseHelper::sendArrayResponse($httpService, $resultArray);
    }


    private static function sendSuccessResponse(IHttpService $httpService) {
        $resultArray = array("success" => 1);
        RequestResponseHelper::sendArrayResponse($httpService, $resultArray);
    }
}
