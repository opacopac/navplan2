<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\OpenAip\UseCase\IAirportRepo;
use Navplan\OpenAip\UseCase\IAirspaceRepo;
use Navplan\OpenAip\UseCase\INavaidRepo;
use Navplan\OpenAip\UseCase\IOpenAipRepoFactory;
use Navplan\OpenAip\UseCase\IReportingPointRepo;
use Navplan\OpenAip\UseCase\IWebcamRepo;
use Navplan\Db\IDb\IDbService;


class DbOpenAipRepoFactory implements IOpenAipRepoFactory {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function createAirportSearch(): IAirportRepo {
        return new DbAirportRepo($this->getDbService());
    }


    public function createAirspaceSearch(): IAirspaceRepo {
        return new DbAirspaceRepo($this->getDbService());
    }


    public function createNavaidSearch(): INavaidRepo {
        return new DbNavaidRepo($this->getDbService());
    }


    public function createReportingPointSearch(): IReportingPointRepo {
        return new DbReportingPointRepo($this->getDbService());
    }


    public function createWebcamSearch(): IWebcamRepo {
        return new DbWebcamRepo($this->getDbService());
    }
}
