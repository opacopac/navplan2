<?php declare(strict_types=1);

namespace Navplan\Enroute\RestService;

use InvalidArgumentException;
use Navplan\Common\RestModel\RestExtent2dConverter;
use Navplan\Enroute\RestModel\RestAirspaceConverter;


class AirspaceServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_GET_AIRSPACES_BY_EXTENT = "getAirspacesByExtent";


    public static function processRequest(array $args, IAirspaceServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_AIRSPACES_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $zoom = intval($args["zoom"]);
                $adList = $diContainer->getAirspaceService()->searchByExtent($extent, $zoom);
                $httpService->sendArrayResponse(RestAirspaceConverter::listToRest($adList));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
