<?php declare(strict_types=1);

namespace NavplanTest\Geoname\DbRepo;

use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geoname\DbRepo\DbGeonameRepo;
use Navplan\Geoname\DomainModel\Geoname;
use NavplanTest\Geoname\Mocks\DummyGeoname1;
use NavplanTest\System\Mock\MockDbService;
use PHPUnit\Framework\TestCase;


class DbGeonameRepoTest extends TestCase {
    private MockDbService $dbService;
    private DbGeonameRepo $dbRepo;


    private function getDbService(): MockDbService {
        return $this->dbService;
    }


    private function getDbRepo(): DbGeonameRepo {
        return $this->dbRepo;
    }


    private function assertEqualGeoname(array $dbResult, Geoname $geo) {
        $this->assertEquals($dbResult['geonameid'], $geo->id);
        $this->assertEquals($dbResult['name'], $geo->name);
        // TODO
        // $this->assertEquals($dbResult['searchresultname'], $geo->searchresultname);
        $this->assertEquals($dbResult['feature_class'], $geo->feature_class);
        $this->assertEquals($dbResult['feature_code'], $geo->feature_code);
        $this->assertEquals($dbResult['country'], $geo->country);
        $this->assertEquals($dbResult['admin1'], $geo->admin1);
        $this->assertEquals($dbResult['admin2'], $geo->admin2);
        $this->assertEquals($dbResult['population'], $geo->population);
        $this->assertEquals($dbResult['longitude'], $geo->position->longitude);
        $this->assertEquals($dbResult['latitude'], $geo->position->latitude);
        $this->assertEquals($dbResult['elevation'], $geo->elevation->value);
    }


    protected function setUp(): void {
        $this->dbService = new MockDbService();
        $this->dbRepo = new DbGeonameRepo($this->getDbService());
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getDbRepo());
    }


    public function test_searchByPosition() {
        $dbResult1 = DummyGeoname1::createDbResult();
        $dbResult2 = DummyGeoname1::createDbResult();
        $this->getDbService()->pushMockResult([$dbResult1, $dbResult2]);
        $pos = new Position2d(7.0, 47.0);
        $navaidResultList = $this->getDbRepo()->searchByPosition($pos, 0.5, 20);

        $this->assertEquals(2, count($navaidResultList));
        $this->assertEqualGeoname($dbResult2, $navaidResultList[1]);
    }


    public function test_searchByText() {
        $dbResult = DummyGeoname1::createDbResult();
        $this->getDbService()->pushMockResult([$dbResult]);
        $navaidResultList = $this->getDbRepo()->searchByText("Bern", 20);

        $this->assertEquals(1, count($navaidResultList));
        $this->assertEqualGeoname($dbResult, $navaidResultList[0]);
    }


    public function test_searchByText_escape_character() {
        $dbResult = DummyGeoname1::createDbResult();
        $this->getDbService()->pushMockResult([$dbResult]);
        $this->getDbRepo()->searchByText("Be'rn", 20);

        $this->assertRegExp("/Be\\\\'rn/", $this->getDbService()->getAllQueriesString());
        $this->assertNotRegExp("/Be'rn/", $this->getDbService()->getAllQueriesString());
    }
}
