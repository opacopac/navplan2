<?php declare(strict_types=1);

namespace Navplan\Terrain\RestService;

use InvalidArgumentException;
use Navplan\Common\RestModel\RestPosition3dConverter;
use Navplan\System\DomainModel\HttpRequestMethod;
use Navplan\System\DomainService\IHttpService;
use Navplan\Terrain\DomainService\ITerrainService;
use Navplan\Terrain\RestModel\RestReadElevationRequest;
use Navplan\Terrain\RestModel\RestReadRouteElevationsRequest;


class TerrainController {
    public static function processRequest(
        ITerrainService $terrainService,
        IHttpService $httpService
    ) {
        switch ($httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $request = RestReadElevationRequest::fromRest($httpService->getGetArgs());
                $pos3dList = $terrainService->readRouteElevations($request->positions);
                $httpService->sendArrayResponse(RestPosition3dConverter::toRestList($pos3dList));
                break;
            case HttpRequestMethod::POST:
                $request = RestReadRouteElevationsRequest::fromArgs($httpService->getPostArgs());
                $pos3dList = $terrainService->readRouteElevations($request->waypointPosList);
                $httpService->sendArrayResponse(RestPosition3dConverter::toRestList($pos3dList));
                break;
            default:
                throw new InvalidArgumentException('unknown request method');
        }
    }
}
