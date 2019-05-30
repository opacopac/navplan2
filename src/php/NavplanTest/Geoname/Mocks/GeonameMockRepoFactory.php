<?php declare(strict_types=1);

namespace NavplanTest\Geoname\Mocks;

use Navplan\Geoname\IRepo\IGeonameSearch;
use Navplan\Geoname\IRepo\IGeonameRepoFactory;


class GeonameMockRepoFactory implements IGeonameRepoFactory {
    private $repoMock;


    public function __construct() {
        $this->repoMock = new GeonameSearchMock();
    }


    public function createGeonameRepo(): IGeonameSearch {
        return $this->repoMock;
    }
}
