<?php declare(strict_types=1);

namespace NavplanTest\Terrain\UseCase;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Terrain\UseCase\ReadElevationList\ReadElevationListUc;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\Terrain\Mocks\MockTerrainRepo;
use PHPUnit\Framework\TestCase;


class ReadElevationListTest extends TestCase {
    private MockTerrainRepo $repoMock;
    private ReadElevationListUc $getElevationList;


    protected function setUp(): void {
        $config = new MockNavplanDiContainer();
        $this->repoMock = $config->terrainRepo;
        $this->getElevationList = $config->getReadElevationListUc();
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getElevationList);
    }


    public function test_get_empty() {
        $posList = [];

        $pos3dList = $this->getElevationList->read($posList);

        $this->assertNotNull($pos3dList);
        $this->assertEquals(0, count($pos3dList));
    }


    public function test_get_single_point() {
        $posList = [ new Position2d(7.0, 47.0) ];
        $alt = Altitude::fromMtAmsl(500);
        $this->repoMock->altitudeResult = $alt;

        $pos3dList = $this->getElevationList->read($posList);

        $this->assertNotNull($pos3dList);
        $this->assertEquals(1, count($pos3dList));
        $this->assertEquals($posList[0]->longitude, $pos3dList[0]->longitude);
        $this->assertEquals($posList[0]->latitude, $pos3dList[0]->latitude);
        $this->assertEquals($alt, $pos3dList[0]->altitude);
    }


    public function test_get_2() {
        $posList = [
            new Position2d(7.0000, 47.0000),
            new Position2d(7.0001, 47.0001),
        ];
        $alt = Altitude::fromMtAmsl(500);
        $this->repoMock->altitudeResult = $alt;

        $pos3dList = $this->getElevationList->read($posList);

        $this->assertNotNull($pos3dList);
        $this->assertCount(2, $pos3dList);
        $this->assertEquals($posList[0]->longitude, $pos3dList[0]->longitude);
        $this->assertEquals($posList[0]->latitude, $pos3dList[0]->latitude);
        $this->assertEquals($alt, $pos3dList[0]->altitude);
        $this->assertEquals($posList[1]->longitude, $pos3dList[1]->longitude);
        $this->assertEquals($posList[1]->latitude, $pos3dList[1]->latitude);
        $this->assertEquals($alt, $pos3dList[1]->altitude);
    }


    public function test_get_3() {
        $posList = [
            new Position2d(7.0000, 47.0000),
            new Position2d(7.0001, 47.0001),
            new Position2d(7.0001, 47.0000),
        ];
        $alt = Altitude::fromMtAmsl(500);
        $this->repoMock->altitudeResult = $alt;

        $pos3dList = $this->getElevationList->read($posList);

        $this->assertNotNull($pos3dList);
        $this->assertCount(3, $pos3dList);
        $this->assertEquals($posList[0]->longitude, $pos3dList[0]->longitude);
        $this->assertEquals($posList[0]->latitude, $pos3dList[0]->latitude);
        $this->assertEquals($alt, $pos3dList[0]->altitude);
        $this->assertEquals($posList[1]->longitude, $pos3dList[1]->longitude);
        $this->assertEquals($posList[1]->latitude, $pos3dList[1]->latitude);
        $this->assertEquals($alt, $pos3dList[1]->altitude);
        $this->assertEquals($posList[2]->longitude, $pos3dList[2]->longitude);
        $this->assertEquals($posList[2]->latitude, $pos3dList[2]->latitude);
        $this->assertEquals($alt, $pos3dList[2]->altitude);
    }


    public function test_get_4() {
        $posList = [
            new Position2d(7.0000, 47.0000),
            new Position2d(7.0001, 47.0001),
            new Position2d(7.0001, 47.0000),
            new Position2d(7.0000, 47.0001),
        ];
        $alt = Altitude::fromMtAmsl(500);
        $this->repoMock->altitudeResult = $alt;

        $pos3dList = $this->getElevationList->read($posList);

        $this->assertNotNull($pos3dList);
        $this->assertCount(4, $pos3dList);
        $this->assertEquals($posList[0]->longitude, $pos3dList[0]->longitude);
        $this->assertEquals($posList[0]->latitude, $pos3dList[0]->latitude);
        $this->assertEquals($alt, $pos3dList[0]->altitude);
        $this->assertEquals($posList[1]->longitude, $pos3dList[1]->longitude);
        $this->assertEquals($posList[1]->latitude, $pos3dList[1]->latitude);
        $this->assertEquals($alt, $pos3dList[1]->altitude);
        $this->assertEquals($posList[2]->longitude, $pos3dList[2]->longitude);
        $this->assertEquals($posList[2]->latitude, $pos3dList[2]->latitude);
        $this->assertEquals($alt, $pos3dList[2]->altitude);
        $this->assertEquals($posList[3]->longitude, $pos3dList[3]->longitude);
        $this->assertEquals($posList[3]->latitude, $pos3dList[3]->latitude);
        $this->assertEquals($alt, $pos3dList[3]->altitude);
    }


    public function test_get_one_intermediate_point() {
        $posList = [
            new Position2d(7.0000, 47.0000),
            new Position2d(7.0000, 47.0010),
        ]; // about 111.2m
        $alt = Altitude::fromMtAmsl(500);
        $this->repoMock->altitudeResult = $alt;

        $pos3dList = $this->getElevationList->read($posList);

        $this->assertNotNull($pos3dList);
        $this->assertCount(3, $pos3dList);
        $this->assertEquals($posList[0]->longitude, $pos3dList[0]->longitude);
        $this->assertEquals($posList[0]->latitude, $pos3dList[0]->latitude);
        $this->assertEquals($alt, $pos3dList[0]->altitude);
        $this->assertEquals(7.0, $pos3dList[1]->longitude);
        $this->assertEquals(47.0005, $pos3dList[1]->latitude);
        $this->assertEquals($alt, $pos3dList[1]->altitude);
        $this->assertEquals($posList[1]->longitude, $pos3dList[2]->longitude);
        $this->assertEquals($posList[1]->latitude, $pos3dList[2]->latitude);
        $this->assertEquals($alt, $pos3dList[2]->altitude);
    }



    public function test_get_max_entries() {
        $posList = [
            new Position2d(7.0, 47.0),
            new Position2d(17.0, 57.0),
            new Position2d(27.0, 67.0),
            new Position2d(37.0, 77.0),
            new Position2d(47.0, 87.0)
        ];
        $alt = Altitude::fromMtAmsl(500);
        $this->repoMock->altitudeResult = $alt;

        $pos3dList = $this->getElevationList->read($posList);

        $this->assertNotNull($pos3dList);
        $this->assertGreaterThanOrEqual(count($posList), count($pos3dList));
        $this->assertLessThanOrEqual(ReadElevationListUc::MAX_STEPS + count($posList), count($pos3dList));
    }
}
