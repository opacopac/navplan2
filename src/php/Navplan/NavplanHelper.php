<?php namespace Navplan;
require_once __DIR__ . "/../config.php";
require_once __DIR__ . "/../Autoloader.php";

// show errors on web page
//error_reporting(E_ALL);
ini_set('display_errors', '1');


class NavplanHelper {
    public static function isBranch(): bool
    {
        return (strpos($_SERVER['REQUEST_URI'], "branch") !== false);
    }
}
