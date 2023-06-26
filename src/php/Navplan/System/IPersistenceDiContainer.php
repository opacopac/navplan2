<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\Domain\Service\IDbService;


interface IPersistenceDiContainer {
    function getDbService(): IDbService;
}
