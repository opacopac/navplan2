<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\OpenAip\IRepo\IAirportSearch;
use Navplan\OpenAip\IRepo\IAirspaceSearch;
use Navplan\OpenAip\IRepo\INavaidSearch;
use Navplan\OpenAip\IRepo\IOpenAipRepoFactory;
use Navplan\OpenAip\IRepo\IReportingPointSearch;
use Navplan\OpenAip\IRepo\IWebcamSearch;
use Navplan\Shared\IDbService;


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
