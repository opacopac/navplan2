<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Command;


interface IAircraftTypeDesignatorDeleteAllCommand
{
    function deleteAll(): void;
}
