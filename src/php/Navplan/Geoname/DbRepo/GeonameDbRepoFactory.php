<?php declare(strict_types=1);

namespace Navplan\Geoname\DbRepo;

use Navplan\Geoname\IRepo\IGeonameRepo;
use Navplan\Geoname\IRepo\IGeonameRepoFactory;
use Navplan\Shared\IDbService;


class GeonameDbRepoFactory implements IGeonameRepoFactory {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function createGeonameRepo(): IGeonameRepo {
        return new GeonameDbRepo($this->getDbService());
    }
}
