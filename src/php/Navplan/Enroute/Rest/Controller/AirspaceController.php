<?php declare(strict_types=1);

namespace Navplan\Enroute\Rest\Controller;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\Rest\Converter\RestExtent2dConverter;
use Navplan\Enroute\Domain\Service\IAirspaceService;
use Navplan\Enroute\Rest\Converter\RestAirspaceConverter;
use Navplan\System\DomainService\IHttpService;


class AirspaceController implements IRestController {
    const ARG_ACTION = "action";
    const ACTION_GET_AIRSPACES_BY_EXTENT = "getAirspacesByExtent";


    public function __construct(
        private IAirspaceService $airspaceService,
        private IHttpService $httpService
    ) {
    }


    public function processRequest() {
        $args = $this->httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_AIRSPACES_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $zoom = intval($args["zoom"]);
                $adList = $this->airspaceService->searchByExtent($extent, $zoom);
                $this->httpService->sendArrayResponse(RestAirspaceConverter::toRestList($adList));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
