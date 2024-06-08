<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Command;

use Navplan\Airspace\Domain\Model\Airspace;


interface IAirspaceInsertAllCommand {
    /**
     * @param Airspace[] $airspaces
     * @return void
     */
    function insertAll(array $airspaces): void;
}
