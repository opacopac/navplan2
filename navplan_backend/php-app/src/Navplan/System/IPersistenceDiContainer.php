<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\Db\Domain\Service\IDbService;


interface IPersistenceDiContainer {
    function getDbService(): IDbService;
}
