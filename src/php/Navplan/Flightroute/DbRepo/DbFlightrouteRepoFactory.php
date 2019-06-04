<?php declare(strict_types=1);

namespace Navplan\Flightroute\DbRepo;

use Navplan\Flightroute\UseCase\IFlightrouteRepo;
use Navplan\Flightroute\UseCase\IFlightrouteRepoFactory;
use Navplan\Db\IDb\IDbService;


class DbFlightrouteRepoFactory implements IFlightrouteRepoFactory {
    private $dbService;


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function createFlightrouteRepo(): IFlightrouteRepo {
        return new DbFlightrouteRepo($this->dbService);
    }
}
