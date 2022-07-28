<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Service;

use Navplan\Enroute\Domain\Model\Airspace;


interface IAirspaceInsertAllCommand {
    /**
     * @param Airspace[] $airspaces
     * @return void
     */
    function insertAll(array $airspaces): void;
}
