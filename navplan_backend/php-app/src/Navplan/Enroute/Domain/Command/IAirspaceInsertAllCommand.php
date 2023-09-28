<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Command;

use Navplan\Enroute\Domain\Model\Airspace;


interface IAirspaceInsertAllCommand {
    /**
     * @param Airspace[] $airspaces
     * @return void
     */
    function insertAll(array $airspaces): void;
}
