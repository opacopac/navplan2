<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\DataImport;

use Navplan\MeteoSma\DataImport\SmaStationParser;
use NavplanTest\MeteoSma\Mocks\DummySmaStation1;
use NavplanTest\MeteoSma\Mocks\DummySmaStation2;
use PHPUnit\Framework\TestCase;


class SmaStationParserTest extends TestCase {
    function test_fromJson() {
        $stationJson = json_decode(DummySmaStation1::createImportJsonString(), true);
        $station = SmaStationParser::fromJson($stationJson);

        $this->assertEquals(DummySmaStation1::create(), $station);
    }


    function test_fromJson_2() {
        $stationJson = json_decode(DummySmaStation2::createImportJsonString(), true);
        $station = SmaStationParser::fromJson($stationJson);

        $this->assertEquals(DummySmaStation2::create(), $station);
    }
}
