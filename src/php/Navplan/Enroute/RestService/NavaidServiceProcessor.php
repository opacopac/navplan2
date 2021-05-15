<?php declare(strict_types=1);

namespace Navplan\Enroute\RestService;

use InvalidArgumentException;
use Navplan\Common\RestModel\RestExtent2dConverter;
use Navplan\Enroute\RestModel\RestNavaidConverter;


class NavaidServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_GET_NAVAIDS_BY_EXTENT = "getNavaidsByExtent";


    public static function processRequest(array $args, INavaidServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_NAVAIDS_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $zoom = intval($args["zoom"]);
                $adList = $diContainer->getNavaidRepo()->searchByExtent($extent, $zoom);
                $httpService->sendArrayResponse(RestNavaidConverter::listToRest($adList));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
