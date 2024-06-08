<?php declare(strict_types=1);

namespace Navplan\Navaid\Domain\Command;


interface INavaidDeleteAllCommand {
    /**
     * @return bool
     */
    function deleteAll(): bool;
}
