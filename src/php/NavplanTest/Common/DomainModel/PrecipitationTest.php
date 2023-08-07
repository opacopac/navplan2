<?php declare(strict_types=1);

namespace NavplanTest\Common\DomainModel;

use Navplan\Common\Domain\Model\Precipitation;
use Navplan\Common\Domain\Model\PrecipitationUnit;
use PHPUnit\Framework\TestCase;


class PrecipitationTest extends TestCase {
    public function test__construct() {
        $temp = new Precipitation(0.2, PrecipitationUnit::MM);

        $this->assertNotNull($temp);
    }


    public function test_getValueFromMm() {
        $temp = new Precipitation(12.5, PrecipitationUnit::MM);

        $this->assertEquals(12.5, $temp->getValue(PrecipitationUnit::MM));
        $this->assertEqualsWithDelta(0.492126, $temp->getValue(PrecipitationUnit::IN), 0.000001);
    }


    public function test_getValueFromIn() {
        $temp = new Precipitation(9.5, PrecipitationUnit::IN);

        $this->assertEquals(241.3 , $temp->getValue(PrecipitationUnit::MM));
        $this->assertEquals(9.5, $temp->getValue(PrecipitationUnit::IN));
    }
}
