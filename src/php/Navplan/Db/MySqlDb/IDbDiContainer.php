<?php declare(strict_types=1);

namespace Navplan\Db\MySqlDb;

use Navplan\Db\DomainService\IDbService;


interface IDbDiContainer {
    function getDbService(): IDbService;
}
