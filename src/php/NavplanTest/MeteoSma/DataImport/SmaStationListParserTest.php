<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\DataImport;

use Navplan\MeteoSma\DataImport\SmaStationListParser;
use NavplanTest\MeteoSma\Mocks\DummySmaStation1;
use NavplanTest\MeteoSma\Mocks\DummySmaStation2;
use NavplanTest\MeteoSma\Mocks\DummySmaStationList1;
use PHPUnit\Framework\TestCase;


class SmaStationListParserTest extends TestCase {
    function test_fromJson() {
        $stationListJson = json_decode(DummySmaStationList1::createImportJsonString(), true);
        $stationList = SmaStationListParser::fromJson($stationListJson);

        $this->assertEquals(2, count($stationList));
        $this->assertEquals(DummySmaStation1::create(), $stationList[0]);
        $this->assertEquals(DummySmaStation2::create(), $stationList[1]);
    }
}
