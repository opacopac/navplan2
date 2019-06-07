<?php declare(strict_types=1);

namespace Navplan\Terrain;

use InvalidArgumentException;
use Navplan\Flightroute\UseCase\IFlightrouteConfig;


class TerrainServiceProcessor {
    const REQ_METHOD_GET = "GET";
    const REQ_METHOD_POST = "POST";


    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, IFlightrouteConfig $config) {
        switch ($requestMethod) {
            case self::REQ_METHOD_GET:
                if (!$_GET["lon"] || !$_GET["lat"])
                    die("ERROR: parameters missing!");
                $positions[] = [ floatval($_GET["lon"]), floatval($_GET["lat"]) ];
                if ($_GET["lon2"] && $_GET["lat2"])
                    $positions[] = [ floatval($_GET["lon2"]), floatval($_GET["lat2"]) ];
                break;
            case self::REQ_METHOD_POST:
                $postData = json_decode(file_get_contents('php://input'), true);
                if (!$postData || !$postData["positions"] || count($postData["positions"]) == 0)
                    die("ERROR: parameters missing!");
                $positions = $postData["positions"];
                break;
            default:
                throw new InvalidArgumentException('unknown request method');
        }
    }
}
