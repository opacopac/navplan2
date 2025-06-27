<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Command;

use Navplan\Aerodrome\Domain\Model\Airport;


interface IAirportCreateAllCommand
{
    /**
     * @param Airport $airports
     * @return void
     */
    function createAll(array $airports): void;
}
