<?php declare(strict_types=1);

namespace Navplan\System\Db\Domain\Model;

use Navplan\System\Db\Domain\Service\IDbService;


interface IDbDiContainer {
    function getDbService(): IDbService;
}
