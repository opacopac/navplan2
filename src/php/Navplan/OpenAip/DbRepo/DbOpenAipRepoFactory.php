<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\Airport\DomainService\IAirportRepo;
use Navplan\OpenAip\DomainService\IAirspaceRepo;
use Navplan\OpenAip\DomainService\INavaidRepo;
use Navplan\OpenAip\DomainService\IOpenAipRepoFactory;
use Navplan\OpenAip\DomainService\IReportingPointRepo;
use Navplan\OpenAip\DomainService\IWebcamRepo;
use Navplan\System\DomainService\IDbService;


class DbOpenAipRepoFactory implements IOpenAipRepoFactory {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function createAirportRepo(): IAirportRepo {
        return new DbAirportRepo($this->getDbService());
    }


    public function createAirspaceRepo(): IAirspaceRepo {
        return new DbAirspaceRepo($this->getDbService());
    }


    public function createNavaidRepo(): INavaidRepo {
        return new DbNavaidRepo($this->getDbService());
    }


    public function createReportingPointRepo(): IReportingPointRepo {
        return new DbReportingPointRepo($this->getDbService());
    }


    public function createWebcamRepo(): IWebcamRepo {
        return new DbWebcamRepo($this->getDbService());
    }
}
