<?php declare(strict_types=1);

namespace NavplanTest\Traffic\RestModel;

use InvalidArgumentException;
use Navplan\Traffic\RestModel\TrafficAdsbexReadRequestConverter;
use PHPUnit\Framework\TestCase;


class TrafficAdsbexReadRequestConverterTest extends TestCase {
    private array $args;

    protected function setUp(): void {
        $this->args = array(
            TrafficAdsbexReadRequestConverter::ARG_MIN_LON => "7.0",
            TrafficAdsbexReadRequestConverter::ARG_MIN_LAT => "47.0",
            TrafficAdsbexReadRequestConverter::ARG_MAX_LON => "7.9",
            TrafficAdsbexReadRequestConverter::ARG_MAX_LAT => "47.9",
        );
    }


    public function test_fromArgs() {
        $request = TrafficAdsbexReadRequestConverter::fromArgs($this->args);

        $this->assertNotNull($request);
        $this->assertEquals(7.0, $request->extent->minPos->longitude);
        $this->assertEquals(47.0, $request->extent->minPos->latitude);
        $this->assertEquals(7.9, $request->extent->maxPos->longitude);
        $this->assertEquals(47.9, $request->extent->maxPos->latitude);
    }


    public function test_fromArgs_missing_minlon() {
        unset($this->args[TrafficAdsbexReadRequestConverter::ARG_MIN_LON]);
        $this->expectException(InvalidArgumentException::class);

        TrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_minlon() {
        $this->args[TrafficAdsbexReadRequestConverter::ARG_MIN_LON] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        TrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_missing_minlat() {
        unset($this->args[TrafficAdsbexReadRequestConverter::ARG_MIN_LAT]);
        $this->expectException(InvalidArgumentException::class);

        TrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_minlat() {
        $this->args[TrafficAdsbexReadRequestConverter::ARG_MIN_LAT] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        TrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_missing_maxlon() {
        unset($this->args[TrafficAdsbexReadRequestConverter::ARG_MAX_LON]);
        $this->expectException(InvalidArgumentException::class);

        TrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_maxlon() {
        $this->args[TrafficAdsbexReadRequestConverter::ARG_MAX_LON] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        TrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_missing_maxlat() {
        unset($this->args[TrafficAdsbexReadRequestConverter::ARG_MAX_LAT]);
        $this->expectException(InvalidArgumentException::class);

        TrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_maxlat() {
        $this->args[TrafficAdsbexReadRequestConverter::ARG_MAX_LAT] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        TrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }
}
