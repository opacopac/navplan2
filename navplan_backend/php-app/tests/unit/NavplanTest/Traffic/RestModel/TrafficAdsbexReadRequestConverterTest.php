<?php declare(strict_types=1);

namespace NavplanTest\Traffic\RestModel;

use InvalidArgumentException;
use Navplan\Traffic\Rest\Model\RestTrafficAdsbexReadRequestConverter;
use PHPUnit\Framework\TestCase;


class TrafficAdsbexReadRequestConverterTest extends TestCase {
    private array $args;

    protected function setUp(): void {
        $this->args = array(
            RestTrafficAdsbexReadRequestConverter::ARG_MIN_LON => "7.0",
            RestTrafficAdsbexReadRequestConverter::ARG_MIN_LAT => "47.0",
            RestTrafficAdsbexReadRequestConverter::ARG_MAX_LON => "7.9",
            RestTrafficAdsbexReadRequestConverter::ARG_MAX_LAT => "47.9",
        );
    }


    public function test_fromArgs() {
        $request = RestTrafficAdsbexReadRequestConverter::fromArgs($this->args);

        $this->assertNotNull($request);
        $this->assertEquals(7.0, $request->extent->minPos->longitude);
        $this->assertEquals(47.0, $request->extent->minPos->latitude);
        $this->assertEquals(7.9, $request->extent->maxPos->longitude);
        $this->assertEquals(47.9, $request->extent->maxPos->latitude);
    }


    public function test_fromArgs_missing_minlon() {
        unset($this->args[RestTrafficAdsbexReadRequestConverter::ARG_MIN_LON]);
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_minlon() {
        $this->args[RestTrafficAdsbexReadRequestConverter::ARG_MIN_LON] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_missing_minlat() {
        unset($this->args[RestTrafficAdsbexReadRequestConverter::ARG_MIN_LAT]);
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_minlat() {
        $this->args[RestTrafficAdsbexReadRequestConverter::ARG_MIN_LAT] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_missing_maxlon() {
        unset($this->args[RestTrafficAdsbexReadRequestConverter::ARG_MAX_LON]);
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_maxlon() {
        $this->args[RestTrafficAdsbexReadRequestConverter::ARG_MAX_LON] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_missing_maxlat() {
        unset($this->args[RestTrafficAdsbexReadRequestConverter::ARG_MAX_LAT]);
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_maxlat() {
        $this->args[RestTrafficAdsbexReadRequestConverter::ARG_MAX_LAT] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequestConverter::fromArgs($this->args);
    }
}
