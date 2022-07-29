<?php declare(strict_types=1);

namespace NavplanTest\Common\RestModel;

use Navplan\Common\DomainModel\Circle2d;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\Rest\Converter\RestCircle2dConverter;
use Navplan\Common\Rest\Converter\RestLengthConverter;
use PHPUnit\Framework\TestCase;


class Circle2dConverterTest extends TestCase {
    public function test_toArray() {
        $pos = new Position2d(7.0, 47.0);
        $len = new Length(12.3, LengthUnit::NM);
        $circ = new Circle2d($pos, $len);
        $rest = RestCircle2dConverter::toRest($circ);

        $this->assertNotNull($rest);
        $this->assertEquals($pos->toArray(), $rest["center"]);
        $this->assertEquals(RestLengthConverter::toRest($len), $rest["radius"]);
    }
}
