<?php declare(strict_types=1);

namespace Navplan\Enroute\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\RestModel\RestExtent2dConverter;
use Navplan\Enroute\Domain\Service\INavaidService;
use Navplan\Enroute\Rest\Model\RestNavaidConverter;
use Navplan\System\DomainService\IHttpService;


class NavaidController {
    const ARG_ACTION = "action";
    const ACTION_GET_NAVAIDS_BY_EXTENT = "getNavaidsByExtent";


    public static function processRequest(
        INavaidService $navaidService,
        IHttpService $httpService
    ) {
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_NAVAIDS_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $zoom = intval($args["zoom"]);
                $adList = $navaidService->searchByExtent($extent, $zoom);
                $httpService->sendArrayResponse(RestNavaidConverter::listToRest($adList));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
