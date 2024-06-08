<?php declare(strict_types=1);

namespace Navplan\Navaid\Domain\Command;

use Navplan\Navaid\Domain\Model\Navaid;


interface INavaidInsertAllCommand {
    /**
     * @param Navaid[] $navaids
     * @return void
     */
    function insertAll(array $navaids): void;
}
