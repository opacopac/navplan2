<?php declare(strict_types=1);

namespace Navplan\Geoname\DbRepo;

use Navplan\Geoname\IRepo\IGeonameSearch;
use Navplan\Geoname\IRepo\IGeonameRepoFactory;
use Navplan\Shared\IDbService;


class DbGeonameRepoFactory implements IGeonameRepoFactory {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function createGeonameRepo(): IGeonameSearch {
        return new DbGeonameSearch($this->getDbService());
    }
}
