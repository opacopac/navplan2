<?php declare(strict_types=1);

namespace NavplanTest\Geometry\Domain;

use InvalidArgumentException;
use Navplan\Geometry\Domain\Extent;
use Navplan\Geometry\Domain\Position2d;
use PHPUnit\Framework\TestCase;


class ExtentTest extends TestCase {
    public function test__construct() {
        $minPos = new Position2d(7.0, 47.0);
        $maxPos = new Position2d(7.9, 47.9);
        $ext = new Extent($minPos, $maxPos);

        $this->assertNotNull($ext);
        $this->assertEquals($minPos, $ext->minPos);
        $this->assertEquals($maxPos, $ext->maxPos);
    }


    public function test__construct_min_greater_max() {
        $minPos = new Position2d(7.0, 47.0);
        $maxPos = new Position2d(7.9, 47.9);
        $this->expectException(InvalidArgumentException::class);
        new Extent($maxPos, $minPos);
    }


    public function test_createFromCoords() {
        $ext = Extent::createFromCoords(7.0, 47.0, 7.9, 47.9);

        $this->assertNotNull($ext);
        $this->assertEquals(7.0, $ext->minPos->longitude);
        $this->assertEquals(47.0, $ext->minPos->latitude);
        $this->assertEquals(7.9, $ext->maxPos->longitude);
        $this->assertEquals(47.9, $ext->maxPos->latitude);
    }
}
