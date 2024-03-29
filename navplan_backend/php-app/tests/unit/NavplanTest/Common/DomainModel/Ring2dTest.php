<?php declare(strict_types=1);

namespace NavplanTest\Common\DomainModel;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\LineInterval2d;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;
use PHPUnit\Framework\TestCase;


class Ring2dTest extends TestCase
{

    public function test__construct()
    {
        $poly = new Ring2d([]);
        $this->assertNotNull($poly);
        $this->assertNotNull($poly->position2dList);
        $this->assertEquals(0, count($poly->position2dList));

        $poly2 = new Ring2d();
        $this->assertNotNull($poly2);
        $this->assertNotNull($poly2->position2dList);
        $this->assertEquals(0, count($poly2->position2dList));
    }


    public function test_createFromString()
    {
        $polyString = "7.1 47.1,7.9 47.9,8.1 48.1,7.1 47.1";
        $poly = Ring2d::createFromString($polyString);

        $this->assertNotNull($poly);
        $this->assertEquals(array(7.1, 47.1), $poly->position2dList[0]->toArray());
        $this->assertEquals(array(7.9, 47.9), $poly->position2dList[1]->toArray());
        $this->assertEquals(array(8.1, 48.1), $poly->position2dList[2]->toArray());
        $this->assertEquals(array(7.1, 47.1), $poly->position2dList[3]->toArray());
    }


    public function test_createFromString2()
    {
        $polyString = "7.1 47.1, 7.9 47.9, 8.1 48.1, 7.1 47.1";
        $poly = Ring2d::createFromString($polyString);

        $this->assertNotNull($poly);
        $this->assertEquals(array(7.1, 47.1), $poly->position2dList[0]->toArray());
        $this->assertEquals(array(7.9, 47.9), $poly->position2dList[1]->toArray());
        $this->assertEquals(array(8.1, 48.1), $poly->position2dList[2]->toArray());
        $this->assertEquals(array(7.1, 47.1), $poly->position2dList[3]->toArray());
    }


    public function test_createFromString_invalid_format_1()
    {
        $polyString = "XXX";
        $this->expectException(InvalidArgumentException::class);
        Ring2d::createFromString($polyString);
    }


    public function test_createFromString_invalid_format_2()
    {
        $polyString = "7.1 47.1,7.9 xx.x,8.1 48.1,7.1 47.1";
        $this->expectException(InvalidArgumentException::class);
        Ring2d::createFromString($polyString);
    }


    public function test_createFromString_invalid_format_3()
    {
        $polyString = "7.1 47.1,7.9,8.1 48.1,7.1 47.1";
        $this->expectException(InvalidArgumentException::class);
        Ring2d::createFromString($polyString);
    }


    public function test_createFromArray()
    {
        $polyArray = [[7.1, 47.1], [7.9, 47.9], [8.1, 48.1], [7.1, 47.1]];
        $poly = Ring2d::createFromArray($polyArray);
        $this->assertEquals($poly->toArray(), $polyArray);
    }


    public function test_toString()
    {
        $poly = Ring2d::createFromArray([[7.1, 47.1], [7.9, 47.9], [8.1, 48.1], [7.1, 47.1]]);
        $polyString = $poly->toString();
        $this->assertEquals("7.1 47.1,7.9 47.9,8.1 48.1,7.1 47.1", $polyString);
    }


    public function test_calcIntersectionPoints() {
        $poly = Ring2d::createFromArray([[0, 0], [2, 2], [4, 0]]);
        $interval = new LineInterval2d(
            new Position2d(0, 1),
            new Position2d(4, 1)
        );

        $isect = $poly->calcIntersectionPoints($interval);

        $this->assertCount(2, $isect);
        $this->assertEquals(new Position2d(1, 1), $isect[0]);
        $this->assertEquals(new Position2d(3, 1), $isect[1]);
    }


    public function test_calcIntersectionPoints_reverse() {
        $poly = Ring2d::createFromArray([[0, 0], [2, 2], [4, 0]]);
        $interval = new LineInterval2d(
            new Position2d(4, 1),
            new Position2d(1, 1)
        );

        $isect = $poly->calcIntersectionPoints($interval);

        $this->assertCount(2, $isect);
        $this->assertEquals(new Position2d(1, 1), $isect[1]);
        $this->assertEquals(new Position2d(3, 1), $isect[0]);
    }
}
