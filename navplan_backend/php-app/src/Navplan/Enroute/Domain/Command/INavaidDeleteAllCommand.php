<?php declare(strict_types=1);

namespace Navplan\Enroute\Domain\Command;


interface INavaidDeleteAllCommand {
    /**
     * @return bool
     */
    function deleteAll(): bool;
}
