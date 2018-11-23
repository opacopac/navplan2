<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;


class FlightrouteServiceProcessor
{
    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, mysqli $conn)
    {
        switch ($requestMethod) {
            case 'GET':
                if ($getVars["shareid"])
                    FlightrouteRead::readSharedNavplan($conn, $getVars);
                elseif ($getVars["id"])
                    FlightrouteRead::readNavplan($conn, $getVars);
                else
                    FlightrouteListRead::readNavplanList($conn, $getVars);
                break;
            case 'POST':
                if ($postVars["createShared"] === TRUE)
                    FlightrouteCreate::createSharedNavplan($conn, $postVars);
                else
                    FlightrouteCreate::createNavplan($conn, $postVars);
                break;
            case 'PUT':
                FlightrouteUpdate::updateNavplan($conn, $postVars);
                break;
            case 'DELETE':
                FlightrouteDelete::deleteNavplan($conn, $getVars);
                break;
            default:
                die("unknown request");
        }
    }
}
