<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\OpenAip\UseCase\IAirportSearch;
use Navplan\OpenAip\UseCase\IAirspaceSearch;
use Navplan\OpenAip\UseCase\INavaidSearch;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\OpenAip\UseCase\IReportingPointSearch;
use Navplan\OpenAip\UseCase\IWebcamSearch;
use Navplan\Db\IDb\IDbService;


class DbOpenAipRepoFactory implements IOpenAipRepoFactory {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function createAirportSearch(): IAirportSearch {
        return new DbAirportSearch($this->getDbService());
    }


    public function createAirspaceSearch(): IAirspaceSearch {
        return new DbAirspaceSearch($this->getDbService());
    }


    public function createNavaidSearch(): INavaidSearch {
        return new DbNavaidSearch($this->getDbService());
    }


    public function createReportingPointSearch(): IReportingPointSearch {
        return new DbReportingPointSearch($this->getDbService());
    }


    public function createWebcamSearch(): IWebcamSearch {
        return new DbWebcamSearch($this->getDbService());
    }
}
