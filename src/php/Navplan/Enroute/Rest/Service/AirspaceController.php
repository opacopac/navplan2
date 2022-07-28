<?php declare(strict_types=1);

namespace Navplan\Enroute\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\RestModel\RestExtent2dConverter;
use Navplan\Enroute\Domain\Service\IAirspaceService;
use Navplan\Enroute\Rest\Model\RestAirspaceConverter;
use Navplan\System\DomainService\IHttpService;


class AirspaceController {
    const ARG_ACTION = "action";
    const ACTION_GET_AIRSPACES_BY_EXTENT = "getAirspacesByExtent";


    public static function processRequest(
        IAirspaceService $airspaceService,
        IHttpService $httpService
    ) {
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_AIRSPACES_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $zoom = intval($args["zoom"]);
                $adList = $airspaceService->searchByExtent($extent, $zoom);
                $httpService->sendArrayResponse(RestAirspaceConverter::listToRest($adList));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
