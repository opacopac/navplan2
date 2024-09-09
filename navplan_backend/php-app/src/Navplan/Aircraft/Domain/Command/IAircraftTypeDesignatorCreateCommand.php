<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Command;

use Navplan\Aircraft\Domain\Model\AircraftTypeDesignator;


interface IAircraftTypeDesignatorCreateCommand
{
    function create(AircraftTypeDesignator $acTypeDesignator): AircraftTypeDesignator;
}
