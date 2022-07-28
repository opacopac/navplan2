<?php declare(strict_types=1);

namespace Navplan\Enroute\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\RestModel\RestExtent2dConverter;
use Navplan\Enroute\IEnrouteDiContainer;
use Navplan\Enroute\Rest\Model\RestNavaidConverter;
use Navplan\System\ISystemDiContainer2;


class NavaidServiceController {
    const ARG_ACTION = "action";
    const ACTION_GET_NAVAIDS_BY_EXTENT = "getNavaidsByExtent";


    public static function processRequest(
        IEnrouteDiContainer $enrouteDiContainer,
        ISystemDiContainer2 $systemDiContainer
    ) {
        $httpService = $systemDiContainer->getHttpService();
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_NAVAIDS_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $zoom = intval($args["zoom"]);
                $adList = $enrouteDiContainer->getNavaidService()->searchByExtent($extent, $zoom);
                $httpService->sendArrayResponse(RestNavaidConverter::listToRest($adList));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
