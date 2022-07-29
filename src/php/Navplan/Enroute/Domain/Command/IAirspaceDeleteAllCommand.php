<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Command;


interface IAirspaceDeleteAllCommand {
    /**
     * @return bool
     */
    function deleteAll(): bool;
}
