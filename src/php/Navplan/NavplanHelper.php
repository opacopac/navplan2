<?php namespace Navplan;


class NavplanHelper {
    const NAVPLAN_BASE_URL = "https://www.navplan.ch/v2/#";


    public static function isBranch(): bool {
        if (!isset($_SERVER['REQUEST_URI'])) {
            return false;
        }

        return (strpos($_SERVER['REQUEST_URI'], "branch") !== false);
    }
}
