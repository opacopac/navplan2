<?php declare(strict_types=1);

namespace Navplan\System\MySqlDb;

use Navplan\System\Domain\Service\IDbService;


interface IDbDiContainer {
    function getDbService(): IDbService;
}
