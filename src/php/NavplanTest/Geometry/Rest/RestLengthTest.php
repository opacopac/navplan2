<?php declare(strict_types=1);

namespace NavplanTest\Geometry\Rest;

use Navplan\Geometry\Domain\Length;
use Navplan\Geometry\Domain\LengthUnit;
use Navplan\Geometry\Rest\RestLength;
use PHPUnit\Framework\TestCase;


class RestLengthTest extends TestCase {
    public function test_toArray() {
        $len = new Length(10.5, LengthUnit::M);
        $rest = RestLength::toRest($len);

        $this->assertNotNull($rest);
        $this->assertEquals(10.5, $rest[0]);
        $this->assertEquals("M", $rest[1]);
    }
}
