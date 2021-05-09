<?php declare(strict_types=1);

namespace NavplanTest\Common\DomainModel;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Extent2d;
use Navplan\Common\DomainModel\Position2d;
use PHPUnit\Framework\TestCase;


class ExtentTest extends TestCase {
    public function test__construct() {
        $minPos = new Position2d(7.0, 47.0);
        $maxPos = new Position2d(7.9, 47.9);
        $ext = new Extent2d($minPos, $maxPos);

        $this->assertNotNull($ext);
        $this->assertEquals($minPos, $ext->minPos);
        $this->assertEquals($maxPos, $ext->maxPos);
    }


    public function test__construct_min_greater_max() {
        $minPos = new Position2d(7.0, 47.0);
        $maxPos = new Position2d(7.9, 47.9);
        $this->expectException(InvalidArgumentException::class);
        new Extent2d($maxPos, $minPos);
    }


    public function test_createFromCoords() {
        $ext = Extent2d::createFromCoords(7.0, 47.0, 7.9, 47.9);

        $this->assertNotNull($ext);
        $this->assertEquals(7.0, $ext->minPos->longitude);
        $this->assertEquals(47.0, $ext->minPos->latitude);
        $this->assertEquals(7.9, $ext->maxPos->longitude);
        $this->assertEquals(47.9, $ext->maxPos->latitude);
    }


    public function test_calcMidPos() {
        $ext1 = Extent2d::createFromCoords(7.0, 47.0, 8.0, 48.0);
        $ext2 = Extent2d::createFromCoords(-1.2, -2.1, 1.2, 2.1);

        $midPos1 = $ext1->calcMidPos();
        $midPos2 = $ext2->calcMidPos();

        $this->assertNotNull($midPos1);
        $this->assertEquals(7.5, $midPos1->longitude);
        $this->assertEquals(47.5, $midPos1->latitude);
        $this->assertNotNull($midPos2);
        $this->assertEquals(0.0, $midPos2->longitude);
        $this->assertEquals(0.0, $midPos2->latitude);
    }


    public function test_containsPos() {
        $pos1 = new Position2d(7.5, 47);
        $pos1b = new Position2d(7.0, 47.0);
        $pos1c = new Position2d(8.0, 48.0);
        $pos1d = new Position2d(7.5, 48.1);
        $ext1 = Extent2d::createFromCoords(7.0, 47.0, 8.0, 48.0);
        $pos2 = new Position2d(0.0, 0.0);
        $ext2 = Extent2d::createFromCoords(-1.2, -2.1, 1.2, 2.1);

        $this->assertEquals(true, $ext1->containsPos($pos1));
        $this->assertEquals(true, $ext1->containsPos($pos1b));
        $this->assertEquals(true, $ext1->containsPos($pos1c));
        $this->assertEquals(false, $ext1->containsPos($pos1d));
        $this->assertEquals(false, $ext1->containsPos($pos2));
        $this->assertEquals(true, $ext2->containsPos($pos2));
        $this->assertEquals(false, $ext2->containsPos($pos1));
    }
}
