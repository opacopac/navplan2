<?php declare(strict_types=1);

namespace Navplan\System\Posix;

use Navplan\System\DomainService\ISystemServiceFactory;


interface ISystemDiContainer {
    function getSystemServiceFactory(): ISystemServiceFactory;
}
