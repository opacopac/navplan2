<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Command;

use Navplan\Aircraft\Domain\Model\Aircraft;


interface IAircraftCreateCommand
{
    function create(Aircraft $aircraft, int $userId): Aircraft;
}
