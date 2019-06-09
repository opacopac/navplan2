<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\UseCase\ISystemConfig;
use Navplan\System\UseCase\ISystemServiceFactory;

// TODO
require_once __DIR__ . "/../../Autoloader.php";


class SystemConfigProd implements ISystemConfig {
    private $systemServiceFactory;


    public function __construct() {
        $this->systemServiceFactory = new SystemServiceFactory();
    }


    public function getSystemServiceFactory(): ISystemServiceFactory {
        return $this->systemServiceFactory;
    }
}
