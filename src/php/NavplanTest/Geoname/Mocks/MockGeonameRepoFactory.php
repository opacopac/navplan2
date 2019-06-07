<?php declare(strict_types=1);

namespace NavplanTest\Geoname\Mocks;

use Navplan\Geoname\UseCase\IGeonameRepoFactory;
use Navplan\Geoname\UseCase\IGeonameRepo;


class MockGeonameRepoFactory implements IGeonameRepoFactory {
    private $repoMock;


    public function __construct() {
        $this->repoMock = new MockGeonameRepo();
    }


    public function createGeonameRepo(): IGeonameRepo {
        return $this->repoMock;
    }
}
