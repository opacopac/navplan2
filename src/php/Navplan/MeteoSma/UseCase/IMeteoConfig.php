<?php declare(strict_types=1);

namespace Navplan\MeteoSma\UseCase;

use Navplan\System\UseCase\ISystemServiceFactory;
use Navplan\System\UseCase\ISystemConfig;


interface IMeteoConfig extends ISystemConfig {
    function getMeteoRepo(): IMeteoRepo;

    function getSystemServiceFactory(): ISystemServiceFactory;
}
