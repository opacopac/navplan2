<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Command;


interface INotamGeometryDeleteAllCommand
{
    function deleteAll(): bool;
}

