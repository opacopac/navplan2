<?php declare(strict_types=1);

namespace NavplanTest\Geometry\DomainModel;

use InvalidArgumentException;
use Navplan\Geometry\DomainModel\Circle2d;
use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\LengthUnit;
use Navplan\Geometry\DomainModel\Position2d;
use PHPUnit\Framework\TestCase;


class Circle2dTest extends TestCase {
    public function test__construct() {
        $circle = new Circle2d(
            new Position2d(7.0, 47.0),
            new Length(15, LengthUnit::NM)
        );

        $this->assertNotNull($circle);
        $this->assertEquals(7.0, $circle->center->longitude);
        $this->assertEquals(47.0, $circle->center->latitude);
        $this->assertEquals(15, $circle->radius->getValue(LengthUnit::NM));
    }


    public function test_negativ_radius_throws_error() {
        $this->expectException(InvalidArgumentException::class);
        new Circle2d(
            new Position2d(7.0, 47.0),
            new Length(-15, LengthUnit::M)
        );
    }
}
