<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Rest;

use InvalidArgumentException;
use Navplan\Geometry\Domain\TimeUnit;
use Navplan\Traffic\Rest\RestReadTrafficRequest;
use PHPUnit\Framework\TestCase;


class RestReadTrafficRequestTest extends TestCase {
    private $args;

    protected function setUp(): void {
        $this->args = array(
            RestReadTrafficRequest::ARG_MIN_LON => "7.0",
            RestReadTrafficRequest::ARG_MIN_LAT => "47.0",
            RestReadTrafficRequest::ARG_MAX_LON => "7.9",
            RestReadTrafficRequest::ARG_MAX_LAT => "47.9",
            RestReadTrafficRequest::ARG_MAX_AGE_SEC => "120",
            RestReadTrafficRequest::ARG_SESSION_ID => "12345"
        );
    }


    public function test_fromArgs() {
        $request = RestReadTrafficRequest::fromArgs($this->args);

        $this->assertNotNull($request);
        $this->assertEquals(7.0, $request->extent->minPos->longitude);
        $this->assertEquals(47.0, $request->extent->minPos->latitude);
        $this->assertEquals(7.9, $request->extent->maxPos->longitude);
        $this->assertEquals(47.9, $request->extent->maxPos->latitude);
        $this->assertEquals(120, $request->maxAge->value);
        $this->assertEquals(TimeUnit::S, $request->maxAge->unit);
        $this->assertEquals(12345, $request->sessionId);
    }


    public function test_fromArgs_missing_minlon() {
        unset($this->args[RestReadTrafficRequest::ARG_MIN_LON]);
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_minlon() {
        $this->args[RestReadTrafficRequest::ARG_MIN_LON] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }


    public function test_fromArgs_missing_minlat() {
        unset($this->args[RestReadTrafficRequest::ARG_MIN_LAT]);
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_minlat() {
        $this->args[RestReadTrafficRequest::ARG_MIN_LAT] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }


    public function test_fromArgs_missing_maxlon() {
        unset($this->args[RestReadTrafficRequest::ARG_MAX_LON]);
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_maxlon() {
        $this->args[RestReadTrafficRequest::ARG_MAX_LON] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }


    public function test_fromArgs_missing_maxlat() {
        unset($this->args[RestReadTrafficRequest::ARG_MAX_LAT]);
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_maxlat() {
        $this->args[RestReadTrafficRequest::ARG_MAX_LAT] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }


    public function test_fromArgs_missing_maxagesec() {
        unset($this->args[RestReadTrafficRequest::ARG_MAX_AGE_SEC]);
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_maxagesec() {
        $this->args[RestReadTrafficRequest::ARG_MAX_AGE_SEC] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }


    public function test_fromArgs_negative_maxagesec() {
        $this->args[RestReadTrafficRequest::ARG_MAX_AGE_SEC] = "-120";
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }


    public function test_fromArgs_missing_sessionid() {
        unset($this->args[RestReadTrafficRequest::ARG_SESSION_ID]);
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }


    public function test_fromArgs_invalid_sessionid() {
        $this->args[RestReadTrafficRequest::ARG_SESSION_ID] = "xxx";
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }


    public function test_fromArgs_negative_sessionid() {
        $this->args[RestReadTrafficRequest::ARG_SESSION_ID] = "-123";
        $this->expectException(InvalidArgumentException::class);

        RestReadTrafficRequest::fromArgs($this->args);
    }
}
