<?php declare(strict_types=1);

namespace Navplan\Airspace\Domain\Command;


interface IAirspaceDeleteAllCommand {
    /**
     * @return bool
     */
    function deleteAll(): bool;
}
