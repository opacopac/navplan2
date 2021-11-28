<?php declare(strict_types=1);

namespace Navplan\Terrain\RestService;

use InvalidArgumentException;
use Navplan\Common\RestModel\RestPosition3dConverter;
use Navplan\System\DomainModel\HttpRequestMethod;
use Navplan\Terrain\RestModel\ReadElevationListRequestConverter;
use Navplan\Terrain\RestModel\ReadElevationRequestConverter;


class TerrainServiceProcessor {
    public static function processRequest(ITerrainDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        switch ($httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                $positions = ReadElevationRequestConverter::fromArgs($httpService->getGetArgs());
                $pos3dList = $diContainer->getReadElevationListUc()->read($positions);
                $httpService->sendArrayResponse(RestPosition3dConverter::listToRest($pos3dList));
                break;
            case HttpRequestMethod::POST:
                $positions = ReadElevationListRequestConverter::fromArgs($httpService->getPostArgs());
                $pos3dList = $diContainer->getReadElevationListUc()->read($positions);
                $httpService->sendArrayResponse(RestPosition3dConverter::listToRest($pos3dList));
                break;
            default:
                throw new InvalidArgumentException('unknown request method');
        }
    }
}
