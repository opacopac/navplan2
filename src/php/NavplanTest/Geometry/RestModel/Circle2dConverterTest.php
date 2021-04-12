<?php declare(strict_types=1);

namespace NavplanTest\Geometry\RestModel;

use Navplan\Geometry\DomainModel\Circle2d;
use Navplan\Geometry\DomainModel\Length;
use Navplan\Geometry\DomainModel\LengthUnit;
use Navplan\Geometry\DomainModel\Position2d;
use Navplan\Geometry\RestModel\Circle2dConverter;
use Navplan\Geometry\RestModel\LengthConverter;
use PHPUnit\Framework\TestCase;


class Circle2dConverterTest extends TestCase {
    public function test_toArray() {
        $pos = new Position2d(7.0, 47.0);
        $len = new Length(12.3, LengthUnit::NM);
        $circ = new Circle2d($pos, $len);
        $rest = Circle2dConverter::toRest($circ);

        $this->assertNotNull($rest);
        $this->assertEquals($pos->toArray(), $rest["center"]);
        $this->assertEquals(LengthConverter::toRest($len), $rest["radius"]);
    }
}
