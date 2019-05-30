<?php declare(strict_types=1);

namespace Navplan\Search\UseCase;

use Navplan\Shared\IDbService;


interface IDb {
    function getDbService(): IDbService;
}
