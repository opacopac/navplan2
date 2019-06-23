<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use InvalidArgumentException;
use Navplan\Traffic\Rest\RestTrafficAdsbexReadRequest;
use PHPUnit\Framework\TestCase;


class RestTrafficAdsbexReadRequestTest extends TestCase {
    private $args;

    protected function setUp(): void {
        $this->args = array(
            RestTrafficAdsbexReadRequest::ARG_MIN_LON => "7.0",
            RestTrafficAdsbexReadRequest::ARG_MIN_LAT => "47.0",
            RestTrafficAdsbexReadRequest::ARG_MAX_LON => "7.9",
            RestTrafficAdsbexReadRequest::ARG_MAX_LAT => "47.9",
        );
    }


    public function test_fromArgs() {
        $request = RestTrafficAdsbexReadRequest::fromArgs($this->args);

        $this->assertNotNull($request);
        $this->assertEquals(7.0, $request->extent->minPos->longitude);
        $this->assertEquals(47.0, $request->extent->minPos->latitude);
        $this->assertEquals(7.9, $request->extent->maxPos->longitude);
        $this->assertEquals(47.9, $request->extent->maxPos->latitude);
    }


    public function test_fromArgs_missing_minlon() {
        unset($this->args[RestTrafficAdsbexReadRequest::ARG_MIN_LON]);
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequest::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_minlon() {
        $this->args[RestTrafficAdsbexReadRequest::ARG_MIN_LON] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequest::fromArgs($this->args);
    }


    public function test_fromArgs_missing_minlat() {
        unset($this->args[RestTrafficAdsbexReadRequest::ARG_MIN_LAT]);
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequest::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_minlat() {
        $this->args[RestTrafficAdsbexReadRequest::ARG_MIN_LAT] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequest::fromArgs($this->args);
    }


    public function test_fromArgs_missing_maxlon() {
        unset($this->args[RestTrafficAdsbexReadRequest::ARG_MAX_LON]);
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequest::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_maxlon() {
        $this->args[RestTrafficAdsbexReadRequest::ARG_MAX_LON] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequest::fromArgs($this->args);
    }


    public function test_fromArgs_missing_maxlat() {
        unset($this->args[RestTrafficAdsbexReadRequest::ARG_MAX_LAT]);
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequest::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_maxlat() {
        $this->args[RestTrafficAdsbexReadRequest::ARG_MAX_LAT] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestTrafficAdsbexReadRequest::fromArgs($this->args);
    }
}
