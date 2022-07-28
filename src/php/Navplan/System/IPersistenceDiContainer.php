<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\DomainService\IDbService;


interface IPersistenceDiContainer {
    function getDbService(): IDbService;
}
