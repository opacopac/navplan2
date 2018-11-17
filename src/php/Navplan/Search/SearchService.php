<?php namespace Navplan\Search;
require_once __DIR__ . "/../NavplanHelper.php";


switch($_GET["action"]) {
    case "searchByText":
        SearchByText::searchByText();
        break;
    case "searchByPosition":
        SearchByPosition::searchByPosition();
        break;
    case "searchByExtent":
        SearchByExtent::searchByExtent();
        break;
    case "searchByIcao":
        SearchByIcao::searchByIcao();
        break;
    default:
        die("unknown action!");
}
