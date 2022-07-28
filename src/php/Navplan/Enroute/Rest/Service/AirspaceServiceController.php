<?php declare(strict_types=1);

namespace Navplan\Enroute\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\RestModel\RestExtent2dConverter;
use Navplan\Enroute\IEnrouteDiContainer;
use Navplan\Enroute\Rest\Model\RestAirspaceConverter;
use Navplan\System\ISystemDiContainer2;


class AirspaceServiceController {
    const ARG_ACTION = "action";
    const ACTION_GET_AIRSPACES_BY_EXTENT = "getAirspacesByExtent";


    public static function processRequest(
        IEnrouteDiContainer $enrouteDiContainer,
        ISystemDiContainer2 $systemDiContainer
    ) {
        $httpService = $systemDiContainer->getHttpService();
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_AIRSPACES_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $zoom = intval($args["zoom"]);
                $adList = $enrouteDiContainer->getAirspaceService()->searchByExtent($extent, $zoom);
                $httpService->sendArrayResponse(RestAirspaceConverter::listToRest($adList));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
