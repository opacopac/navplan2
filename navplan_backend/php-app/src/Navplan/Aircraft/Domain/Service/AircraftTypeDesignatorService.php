<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Service;

use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorCreateCommand;
use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorDeleteAllCommand;
use Navplan\Aircraft\Domain\Model\AircraftTypeDesignator;


class AircraftTypeDesignatorService implements IAircraftTypeDesignatorService
{
    public function __construct(
        private IAircraftTypeDesignatorCreateCommand $typeDesignatorCreateCommand,
        private IAircraftTypeDesignatorDeleteAllCommand $typeDesignatorDeleteAllCommand
    )
    {
    }


    public function create(AircraftTypeDesignator $typeDesignator): AircraftTypeDesignator
    {
        return $this->typeDesignatorCreateCommand->create($typeDesignator);
    }


    public function deleteAll(): void
    {
        $this->typeDesignatorDeleteAllCommand->deleteAll();
    }
}
