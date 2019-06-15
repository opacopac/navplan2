<?php declare(strict_types=1);

namespace Navplan\Notam\UseCase;

use Navplan\System\UseCase\ISystemConfig;
use Navplan\System\UseCase\ISystemServiceFactory;


interface INotamConfig extends ISystemConfig {
    function getNotamRepo(): INotamRepo;

    function getSystemServiceFactory(): ISystemServiceFactory;
}
