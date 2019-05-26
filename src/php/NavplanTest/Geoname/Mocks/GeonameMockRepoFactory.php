<?php declare(strict_types=1);

namespace NavplanTest\Geoname\Mocks;

use Navplan\Geoname\IRepo\IGeonameRepo;
use Navplan\Geoname\IRepo\IGeonameRepoFactory;


class GeonameMockRepoFactory implements IGeonameRepoFactory {
    private $repoMock;


    public function __construct() {
        $this->repoMock = new GeonameRepoMock();
    }


    public function createGeonameRepo(): IGeonameRepo {
        return $this->repoMock;
    }
}
