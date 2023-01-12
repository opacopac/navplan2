<?php declare(strict_types=1);

namespace NavplanTest\Common\DomainModel;

use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\Line2d;
use Navplan\Common\DomainModel\Position2d;
use PHPUnit\Framework\TestCase;


class Line2dTest extends TestCase {
    public function test__construct() {
        $pos1 = new Position2d(7.0, 47.0);
        $pos2 = new Position2d(8.0, 48.0);
        $line = new Line2d([$pos1, $pos2]);

        $this->assertNotNull($line);
    }


    public function test__construct_not_enough_points() {
        $pos1 = new Position2d(7.0, 47.0);

        $this->expectException(\InvalidArgumentException::class);
        new Line2d([$pos1]);
    }


    public function test_calcTotalDist() {
        $pos1 = new Position2d(7.0, 47.0);
        $pos2 = new Position2d(8.0, 48.0);
        $pos3 = new Position2d(7.0, 49.0);
        $line = new Line2d([$pos1, $pos2, $pos3]);

        $length = $line->calcTotalDist();

        $this->assertEqualsWithDelta(134190.0 + 133390.0, $length->getM(), 10);
    }


    public function test_subdividePosList() {
        $pos1 = new Position2d(7.0, 47.0);
        $pos2 = new Position2d(8.0, 48.0);
        $pos3 = new Position2d(7.0, 49.0);
        $line = new Line2d([$pos1, $pos2, $pos3]);

        $subPosList = $line->subdividePosList(Length::fromM(70000), 999);

        $this->assertEquals(5, count($subPosList));
        $this->assertEquals($pos1, $subPosList[0]);
        $this->assertEqualsWithDelta(7.5, $subPosList[1]->longitude, 0.1);
        $this->assertEqualsWithDelta(47.5, $subPosList[1]->latitude, 0.1);
        $this->assertEquals($pos2, $subPosList[2]);
        $this->assertEqualsWithDelta(7.5, $subPosList[3]->longitude, 0.1);
        $this->assertEqualsWithDelta(48.5, $subPosList[3]->latitude, 0.1);
        $this->assertEquals($pos3, $subPosList[4]);

        $subPosList2 = $line->subdividePosList(Length::fromM(60000), 999);

        $this->assertEquals(7, count($subPosList2));
        $this->assertEquals($pos1, $subPosList2[0]);
        $this->assertEquals($pos2, $subPosList2[3]);
        $this->assertEquals($pos3, $subPosList2[6]);

        $subPosList3 = $line->subdividePosList(Length::fromM(140000), 999);

        $this->assertEquals(3, count($subPosList3));
        $this->assertEquals($pos1, $subPosList3[0]);
        $this->assertEquals($pos2, $subPosList3[1]);
        $this->assertEquals($pos3, $subPosList3[2]);
    }
}
