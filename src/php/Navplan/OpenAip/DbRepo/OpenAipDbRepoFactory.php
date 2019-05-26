<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbRepo;

use Navplan\OpenAip\IRepo\IAirportRepo;
use Navplan\OpenAip\IRepo\IAirspaceRepo;
use Navplan\OpenAip\IRepo\INavaidRepo;
use Navplan\OpenAip\IRepo\IOpenAipRepoFactory;
use Navplan\OpenAip\IRepo\IReportingPointRepo;
use Navplan\OpenAip\IRepo\IWebcamRepo;
use Navplan\Shared\IDbService;


class OpenAipDbRepoFactory implements IOpenAipRepoFactory {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function createAirportRepo(): IAirportRepo {
        return new AirportDbRepo($this->getDbService());
    }


    public function createAirspaceRepo(): IAirspaceRepo {
        return new AirspaceDbRepo($this->getDbService());
    }


    public function createNavaidRepo(): INavaidRepo {
        return new NavaidDbRepo($this->getDbService());
    }


    public function createReportingPointRepo(): IReportingPointRepo {
        return new ReportingPointDbRepo($this->getDbService());
    }


    public function createWebcamRepo(): IWebcamRepo {
        return new WebcamDbRepo($this->getDbService());
    }
}
