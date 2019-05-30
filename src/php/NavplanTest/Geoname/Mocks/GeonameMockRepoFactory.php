<?php declare(strict_types=1);

namespace NavplanTest\Geoname\Mocks;

use Navplan\Geoname\UseCase\IGeonameRepoFactory;
use Navplan\Geoname\UseCase\IGeonameSearch;


class GeonameMockRepoFactory implements IGeonameRepoFactory {
    private $repoMock;


    public function __construct() {
        $this->repoMock = new GeonameSearchMock();
    }


    public function createGeonameRepo(): IGeonameSearch {
        return $this->repoMock;
    }
}
