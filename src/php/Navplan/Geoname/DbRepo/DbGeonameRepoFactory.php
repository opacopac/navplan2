<?php declare(strict_types=1);

namespace Navplan\Geoname\DbRepo;

use Navplan\Geoname\UseCase\IGeonameRepoFactory;
use Navplan\Db\IDb\IDbService;


class DbGeonameRepoFactory implements IGeonameRepoFactory {
    /* @var $dbService IDbService */
    private $dbService;


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function createGeonameRepo(): IGeonameSearch {
        return new DbGeonameRepo($this->dbService);
    }
}
