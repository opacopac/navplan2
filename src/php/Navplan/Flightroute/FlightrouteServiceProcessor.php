<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbConnection;
use Navplan\Shared\DbException;


class FlightrouteServiceProcessor
{
    /**
     * @param string $requestMethod
     * @param array|null $getVars
     * @param array|null $postVars
     * @param DbConnection $conn
     * @throws DbException
     */
    public static function processRequest(string $requestMethod, ?array $getVars, ?array $postVars, DbConnection $conn)
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
