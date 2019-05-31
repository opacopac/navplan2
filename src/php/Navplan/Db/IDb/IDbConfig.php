<?php declare(strict_types=1);

namespace Navplan\Db\IDb;


interface IDbConfig {
    function getDbService(): IDbService;
}
