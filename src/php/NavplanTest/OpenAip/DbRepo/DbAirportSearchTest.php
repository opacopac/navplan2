<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\DbRepo;

use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use Navplan\OpenAip\DbRepo\DbAirportSearch;
use Navplan\OpenAip\Domain\Airport;
use Navplan\OpenAip\Domain\AirportRadio;
use Navplan\OpenAip\Domain\AirportRunway;
use Navplan\OpenAip\Domain\MapFeature;
use Navplan\OpenAip\Domain\Webcam;
use NavplanTest\DbServiceMock;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use PHPUnit\Framework\TestCase;


class DbAirportSearchTest extends TestCase {
    private $dbService;
    private $dbRepo;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    private function getDbRepo(): DbAirportSearch {
        return $this->dbRepo;
    }


    private function prepareAirport1DbResult() {
        $adDb = DummyAirport1::createDbResult();
        $rwy1Db = DummyAirport1::createRunway1DbResult();
        $rwy2Db = DummyAirport1::createRunway2DbResult();
        $rdo1Db = DummyAirport1::createRadio1DbResult();
        $rdo2Db = DummyAirport1::createRadio2DbResult();
        $camDb = DummyAirport1::createWebcam1DbResult();
        $featDb = DummyAirport1::createMapFeature1DbResult();
        $this->getDbService()->pushMockResult([$adDb]);
        $this->getDbService()->pushMockResult([$rwy1Db, $rwy2Db]);
        $this->getDbService()->pushMockResult([$rdo1Db, $rdo2Db]);
        $this->getDbService()->pushMockResult([$camDb]);
        $this->getDbService()->pushMockResult([$featDb]);

        return [$adDb, [$rwy1Db, $rwy2Db], [$rdo1Db, $rdo2Db], [], [$camDb], [$featDb]];
    }


    // region assert helper

    private function assertEqualAirport(array $prepDbResults, Airport $ad) {
        $adDb = $prepDbResults[0];
        $this->assertEquals($adDb['id'], $ad->id);
        $this->assertEquals($adDb['type'], $ad->type);
        $this->assertEquals($adDb['name'], $ad->name);
        $this->assertEquals($adDb['country'], $ad->country);
        $this->assertEquals($adDb['latitude'], $ad->position->latitude);
        $this->assertEquals($adDb['longitude'], $ad->position->longitude);
        $this->assertEquals($adDb['elevation'], $ad->elevation);

        for ($i = 0; $i < count($ad->runways); $i++) {
            $this->assertEqualRunway($prepDbResults[1][$i], $ad->runways[$i]);
        }

        for ($i = 0; $i < count($ad->radios); $i++) {
            $this->assertEqualRadio($prepDbResults[2][$i], $ad->radios[$i]);
        }

        for ($i = 0; $i < count($ad->webcams); $i++) {
            $this->assertEqualWebcams($prepDbResults[4][$i], $ad->webcams[$i]);
        }

        for ($i = 0; $i < count($ad->mapfeatures); $i++) {
            $this->assertEqualMapFeatures($prepDbResults[5][$i], $ad->mapfeatures[$i]);
        }
    }

    private function assertEqualRunway(array $rwyDb, AirportRunway $rwy) {
        $this->assertEquals($rwyDb['name'], $rwy->name);
        $this->assertEquals($rwyDb['surface'], $rwy->surface);
        $this->assertEquals($rwyDb['length'], $rwy->length);
        $this->assertEquals($rwyDb['width'], $rwy->width);
        $this->assertEquals($rwyDb['direction1'], $rwy->direction1);
        $this->assertEquals($rwyDb['direction2'], $rwy->direction2);
        $this->assertEquals($rwyDb['tora1'], $rwy->tora1);
        $this->assertEquals($rwyDb['tora2'], $rwy->tora2);
        $this->assertEquals($rwyDb['lda1'], $rwy->lda1);
        $this->assertEquals($rwyDb['lda2'], $rwy->lda2);
        $this->assertEquals($rwyDb['papi1'], $rwy->papi1);
        $this->assertEquals($rwyDb['papi2'], $rwy->papi2);
    }


    private function assertEqualRadio(array $rdoDb, AirportRadio $rdo) {
        $this->assertEquals($rdoDb['category'], $rdo->category);
        $this->assertEquals($rdoDb['frequency'], $rdo->frequency);
        $this->assertEquals($rdoDb['type'], $rdo->type);
        $this->assertEquals($rdoDb['typespec'], $rdo->typespec);
        $this->assertEquals($rdoDb['description'], $rdo->description);
    }


    private function assertEqualWebcams(array $camDb, Webcam $cam) {
        $this->assertEquals($camDb['name'], $cam->name);
        $this->assertEquals($camDb['url'], $cam->url);
    }

    private function assertEqualMapFeatures(array $featDb, MapFeature $feat) {
        $this->assertEquals($featDb['name'], $feat->name);
        $this->assertEquals($featDb['type'], $feat->type);
    }

    // endregion



    protected function setUp(): void {
        $this->dbService = new DbServiceMock();
        $this->dbRepo = new DbAirportSearch($this->getDbService());
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getDbRepo());
    }


    public function test_searchByExtent() {
        $prepDbResults = $this->prepareAirport1DbResult();
        $extent = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);
        $adList = $this->getDbRepo()->searchByExtent($extent, 11);

        $this->assertEquals(1, count($adList));
        $this->assertEqualAirport($prepDbResults, $adList[0]);
    }


    public function test_searchByPosition() {
        $prepDbResults = $this->prepareAirport1DbResult();
        $pos = new Position2d(7.0, 47.0);
        $adList = $this->getDbRepo()->searchByPosition($pos, 0.5, 20);

        $this->assertEquals(1, count($adList));
        $this->assertEqualAirport($prepDbResults, $adList[0]);
    }


    public function test_searchByText() {
        $prepDbResults = $this->prepareAirport1DbResult();
        $adList = $this->getDbRepo()->searchByText("LSZB", 20);

        $this->assertEquals(1, count($adList));
        $this->assertEqualAirport($prepDbResults, $adList[0]);
    }


    public function test_searchByText_escape_character() {
        $this->prepareAirport1DbResult();
        $this->getDbRepo()->searchByText("L'ZB", 20);

        $this->assertRegExp("/L\\\\'ZB/", $this->getDbService()->getAllQueriesString());
        $this->assertNotRegExp("/L'ZB/", $this->getDbService()->getAllQueriesString());
    }
}
