<?php declare(strict_types=1);

namespace Navplan\Flightroute;

use http\Exception\InvalidArgumentException;
use Navplan\Shared\IDbService;
use Navplan\Shared\IHttpResponseService;


class FlightrouteServiceProcessor {
    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, IDbService $dbService, IHttpResponseService $httpService) {
        switch ($requestMethod) {
            case 'GET':
                if (isset($getVars["shareid"]))
                    FlightrouteRead::readSharedNavplan($dbService, $httpService, $getVars);
                elseif (isset($getVars["id"]))
                    FlightrouteRead::readNavplan($dbService, $httpService, $getVars);
                else
                    FlightrouteListRead::readNavplanList($dbService, $httpService, $getVars);
                break;
            case 'POST':
                if (isset($postVars["createShared"]) && $postVars["createShared"] === TRUE)
                    FlightrouteCreate::createSharedNavplan($dbService, $httpService, $postVars);
                else
                    FlightrouteCreate::createNavplan($dbService, $httpService, $postVars);
                break;
            case 'PUT':
                FlightrouteUpdate::updateNavplan($dbService, $httpService, $postVars);
                break;
            case 'DELETE':
                FlightrouteDelete::deleteNavplan($dbService, $httpService, $getVars);
                break;
            default:
                throw new InvalidArgumentException('unknown request');
        }
    }
}
