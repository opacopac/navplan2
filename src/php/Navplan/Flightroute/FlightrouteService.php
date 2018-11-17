<?php namespace Navplan\Flightroute;
require_once __DIR__ . "/../NavplanHelper.php";


header("Access-Control-Allow-Origin: *"); // TODO: remove for PROD

switch ($_SERVER['REQUEST_METHOD'])
{
    case 'GET':
        if ($_GET["shareid"])
            FlightrouteRead::readSharedNavplan();
        elseif ($_GET["id"])
            FlightrouteRead::readNavplan();
        else
            FlightrouteListRead::readNavplanList();
        break;
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), TRUE);
        if ($input["createShared"] === TRUE)
            FlightrouteCreate::createSharedNavplan($input);
        else
            FlightrouteCreate::createNavplan($input);
        break;
    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), TRUE);
        FlightrouteUpdate::updateNavplan($input);
        break;
    case 'DELETE':
        FlightrouteDelete::deleteNavplan();
        break;
    default:
        die("unknown request");
}
