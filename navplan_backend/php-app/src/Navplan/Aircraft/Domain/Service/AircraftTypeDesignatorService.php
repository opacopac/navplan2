<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Service;

use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorCreateCommand;
use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorDeleteAllCommand;
use Navplan\Aircraft\Domain\Model\AircraftTypeDesignator;
use Navplan\Aircraft\Domain\Query\IAircraftTypeDesignatorSearchQuery;


class AircraftTypeDesignatorService implements IAircraftTypeDesignatorService
{
    private const MAX_RESULTS = 10;

    public function __construct(
        private IAircraftTypeDesignatorCreateCommand $typeDesignatorCreateCommand,
        private IAircraftTypeDesignatorDeleteAllCommand $typeDesignatorDeleteAllCommand,
        private IAircraftTypeDesignatorSearchQuery $typeDesignatorSearchQuery
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


    public function searchByText(string $searchText): array
    {
        return $this->typeDesignatorSearchQuery->search($searchText, self::MAX_RESULTS);
    }
}
