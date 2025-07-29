<?php declare(strict_types=1);

namespace Navplan\Aircraft\Persistence\Command;

use Navplan\Aircraft\Domain\Command\IAircraftTypeDesignatorCreateCommand;
use Navplan\Aircraft\Domain\Model\AircraftTypeDesignator;
use Navplan\Aircraft\Persistence\Model\DbAircraftTypeDesignatorConverter;
use Navplan\Aircraft\Persistence\Model\DbTableAircraftTypeDesignator;
use Navplan\System\Db\Domain\Service\IDbService;


readonly class DbAircraftTypeDesignatorCreateCommand implements IAircraftTypeDesignatorCreateCommand
{
    public function __construct(
        private IDbService $dbService,
    )
    {
    }


    public function create(AircraftTypeDesignator $acTypeDesignator): AircraftTypeDesignator
    {
        $t = new DbTableAircraftTypeDesignator();
        $converter = new DbAircraftTypeDesignatorConverter($t);
        $icb = $this->dbService->getInsertCommandBuilder()->insertInto($t);
        $converter->bindInsertValues($acTypeDesignator, $icb);

        $statement = $icb->buildAndBindStatement();
        $statement->execute("error creating aircraft type designator");
        $acTypeDesignator->id = $this->dbService->getInsertId();

        return $acTypeDesignator;
    }
}
