<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use http\Exception\InvalidArgumentException;
use Navplan\Shared\IDbService;


class FlightrouteServiceProcessor {
    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, IDbService $dbService) {
        switch ($requestMethod) {
            case 'GET':
                if ($getVars["shareid"])
                    FlightrouteRead::readSharedNavplan($dbService, $getVars);
                elseif ($getVars["id"])
                    FlightrouteRead::readNavplan($dbService, $getVars);
                else
                    FlightrouteListRead::readNavplanList($dbService, $getVars);
                break;
            case 'POST':
                if ($postVars["createShared"] === TRUE)
                    FlightrouteCreate::createSharedNavplan($dbService, $postVars);
                else
                    FlightrouteCreate::createNavplan($dbService, $postVars);
                break;
            case 'PUT':
                FlightrouteUpdate::updateNavplan($dbService, $postVars);
                break;
            case 'DELETE':
                FlightrouteDelete::deleteNavplan($dbService, $getVars);
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }
}
