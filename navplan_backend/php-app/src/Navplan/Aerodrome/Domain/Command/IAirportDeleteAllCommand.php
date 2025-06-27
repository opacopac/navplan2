<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Command;


interface IAirportDeleteAllCommand
{
    function deleteAll(): bool;
}
