<?php declare(strict_types=1);

namespace NavplanTest\Geometry\Rest;

use Navplan\Geometry\Domain\Circle2d;
use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;
use Navplan\Geometry\Domain\Position2d;
use Navplan\Geometry\Rest\RestCircle2d;
use Navplan\Geometry\Rest\RestLength;
use PHPUnit\Framework\TestCase;


class RestCircle2dTest extends TestCase {
    public function test_toArray() {
        $pos = new Position2d(7.0, 47.0);
        $len = new Length(12.3, LengthUnit::NM);
        $circ = new Circle2d($pos, $len);
        $rest = RestCircle2d::toRest($circ);

        $this->assertNotNull($rest);
        $this->assertEquals($pos->toArray(), $rest["center"]);
        $this->assertEquals(RestLength::toRest($len), $rest["radius"]);
    }
}
