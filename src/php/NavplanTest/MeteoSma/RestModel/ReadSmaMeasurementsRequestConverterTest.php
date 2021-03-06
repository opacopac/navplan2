<?php declare(strict_types=1);

namespace NavplanTest\MeteoSma\RestModel;

use InvalidArgumentException;
use Navplan\MeteoSma\RestModel\ReadSmaMeasurementsRequestConverter;
use PHPUnit\Framework\TestCase;


class ReadSmaMeasurementsRequestConverterTest extends TestCase {
    public function test_fromArgs() {
        $args = array(
            "minlon" => "7.0",
            "minlat" => "47.0",
            "maxlon" => "7.9",
            "maxlat" => "47.9",
        );

        $request = ReadSmaMeasurementsRequestConverter::fromArgs($args);

        $this->assertEquals(7.0, $request->extent->minPos->longitude);
        $this->assertEquals(47.0, $request->extent->minPos->latitude);
        $this->assertEquals(7.9, $request->extent->maxPos->longitude);
        $this->assertEquals(47.9, $request->extent->maxPos->latitude);
    }


    public function test_fromArgs_missing_args() {
        $args = array(
            "minlon" => "7.0",
            "maxlon" => "7.9",
            "maxlat" => "47.9",
        );
        $this->expectException(InvalidArgumentException::class);

        ReadSmaMeasurementsRequestConverter::fromArgs($args);
    }


    public function test_fromArgs_invalid_args() {
        $args = array(
            "minlon" => "47'0",
            "minlat" => "47.0",
            "maxlon" => "7.9",
            "maxlat" => "47.9",
        );
        $this->expectException(InvalidArgumentException::class);

        ReadSmaMeasurementsRequestConverter::fromArgs($args);
    }
}
