<?php declare(strict_types=1);

namespace Navplan\Enroute\Rest\Controller;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\RestModel\RestExtent2dConverter;
use Navplan\Enroute\Domain\Service\INavaidService;
use Navplan\Enroute\Rest\Converter\RestNavaidConverter;
use Navplan\System\DomainService\IHttpService;


class NavaidController implements IRestController {
    const ARG_ACTION = "action";
    const ACTION_GET_NAVAIDS_BY_EXTENT = "getNavaidsByExtent";


    public function __construct(
        private INavaidService $navaidService,
        private IHttpService $httpService
    ) {
    }


    public function processRequest() {
        $args = $this->httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_NAVAIDS_BY_EXTENT:
                $extent = RestExtent2dConverter::fromArgs($args);
                $zoom = intval($args["zoom"]);
                $adList = $this->navaidService->searchByExtent($extent, $zoom);
                $this->httpService->sendArrayResponse(RestNavaidConverter::toRestList($adList));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
