<?php declare(strict_types=1);

namespace Navplan\Terrain\RestService;

use InvalidArgumentException;
use Navplan\Terrain\RestModel\ReadElevationListRequestConverter;
use Navplan\Terrain\RestModel\ReadElevationRequestConverter;


class TerrainServiceProcessor {
    const REQ_METHOD_GET = "GET";
    const REQ_METHOD_POST = "POST";


    public static function processRequest(string $requestMethod, ?array $getArgs, ?array $postArgs, ITerrainDiContainer $diContainer) {
        switch ($requestMethod) {
            case self::REQ_METHOD_GET:
                $positions = ReadElevationRequestConverter::fromArgs($getArgs);
                // TODO: call UC & http response
                break;
            case self::REQ_METHOD_POST:
                $positions = ReadElevationListRequestConverter::fromArgs($postArgs);
                $elevationPosList = $diContainer->getReadElevationListUc()->read($positions);
                // TODO: http response
                break;
            default:
                throw new InvalidArgumentException('unknown request method');
        }
    }
}
