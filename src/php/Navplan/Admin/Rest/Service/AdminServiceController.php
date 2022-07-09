<?php declare(strict_types=1);

namespace Navplan\Admin\Rest\Service;

use InvalidArgumentException;
use Navplan\Admin\Domain\Service\IAdminServiceDiContainer;
use Navplan\Admin\Rest\Model\RestNavaidImportResultConverter;


class AdminServiceController {
    const ARG_ACTION = "action";
    const ACTION_GET_SHORT_AD_BY_EXTENT = "importNavaids";


    public static function processRequest(IAdminServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $args = $httpService->getGetArgs();
        $action = $args[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_GET_SHORT_AD_BY_EXTENT:
                $result = $diContainer->getOpenAipImporter()->importNavaids();
                $httpService->sendArrayResponse(RestNavaidImportResultConverter::toRest($result));
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
