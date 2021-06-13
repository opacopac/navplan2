<?php declare(strict_types=1);

namespace Navplan\Terrain\RestService;

use InvalidArgumentException;
use Navplan\Common\RestModel\RestPosition3dConverter;
use Navplan\Terrain\RestModel\ReadElevationListRequestConverter;
use Navplan\Terrain\RestModel\ReadElevationRequestConverter;


class TerrainServiceProcessor {
    const REQ_METHOD_GET = "GET";
    const REQ_METHOD_POST = "POST";


    public static function processRequest(string $requestMethod, ?array $getArgs, ?array $postArgs, ITerrainDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        switch ($requestMethod) {
            case self::REQ_METHOD_GET:
                $positions = ReadElevationRequestConverter::fromArgs($getArgs);
                $pos3dList = $diContainer->getReadElevationListUc()->read($positions);
                $httpService->sendArrayResponse(RestPosition3dConverter::listToRest($pos3dList));
                break;
            case self::REQ_METHOD_POST:
                $positions = ReadElevationListRequestConverter::fromArgs($postArgs);
                $pos3dList = $diContainer->getReadElevationListUc()->read($positions);
                $httpService->sendArrayResponse(RestPosition3dConverter::listToRest($pos3dList));
                break;
            default:
                throw new InvalidArgumentException('unknown request method');
        }
    }
}
