<?php declare(strict_types=1);

namespace Navplan\Admin\Console\Service;

use InvalidArgumentException;
use Navplan\Admin\Domain\Service\IAdminServiceDiContainer;
use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../../ConsoleBootstrap.php";


$diContainer = new ProdNavplanDiContainer();

ConsoleAdminService::processRequest($diContainer, $argv);


class ConsoleAdminService {
    const ARG_IMPORT_AIRPORTS = "--importAirports";
    const ARG_IMPORT_AIRSPACES = "--importAirspaces";
    const ARG_IMPORT_NAVAIDS = "--importNavaids";


    public static function processRequest(IAdminServiceDiContainer $diContainer, array $args) {
        $action = $args[1] ?? NULL;
        switch ($action) {
            case self::ARG_IMPORT_AIRPORTS:
                $diContainer->getAdminService()->importAirports();
                break;
            case self::ARG_IMPORT_AIRSPACES:
                $diContainer->getAdminService()->importAirspaces();
                break;
            case self::ARG_IMPORT_NAVAIDS:
                $diContainer->getAdminService()->importNavaids();
                break;
            default:
                throw new InvalidArgumentException("no or unknown action '" . $action . "'");
        }
    }
}
