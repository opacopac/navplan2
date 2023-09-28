<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Command;

use Navplan\Enroute\Domain\Model\Navaid;


interface INavaidInsertAllCommand {
    /**
     * @param Navaid[] $navaids
     * @return void
     */
    function insertAll(array $navaids): void;
}
