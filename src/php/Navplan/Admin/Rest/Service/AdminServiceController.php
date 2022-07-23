<?php declare(strict_types=1);

namespace Navplan\Admin\Rest\Service;

use InvalidArgumentException;
use Navplan\Admin\Domain\Service\IAdminServiceDiContainer;
use Navplan\Admin\Rest\Model\RestImportResponseConverter;


class AdminServiceController {
    const ARG_ACTION = "action";
    const ACTION_IMPORT_AIRPORTS = "importAirports";
    const ACTION_IMPORT_AIRSPACES = "importAirspaces";
    const ACTION_IMPORT_NAVAIDS = "importNavaids";


    public static function processRequest(IAdminServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_IMPORT_AIRPORTS:
                $result = $diContainer->getAdminService()->importAirports();
                $httpService->sendArrayResponse(RestImportResponseConverter::toRest($result));
                break;
            case self::ACTION_IMPORT_AIRSPACES:
                $result = $diContainer->getAdminService()->importAirspaces();
                $httpService->sendArrayResponse(RestImportResponseConverter::toRest($result));
                break;
            case self::ACTION_IMPORT_NAVAIDS:
                $result = $diContainer->getAdminService()->importNavaids();
                $httpService->sendArrayResponse(RestImportResponseConverter::toRest($result));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
