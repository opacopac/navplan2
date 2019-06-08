<?php declare(strict_types=1);

namespace Navplan\Db\UseCase;


interface IDbConfig {
    function getDbService(): IDbService;
}
