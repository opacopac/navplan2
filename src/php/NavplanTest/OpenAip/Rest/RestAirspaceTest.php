<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Rest;

use Navplan\Geometry\Domain\AltitudeReference;
use Navplan\Geometry\Domain\AltitudeUnit;
use Navplan\OpenAip\Rest\RestAirspace;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use PHPUnit\Framework\TestCase;


class RestAirspaceTest extends TestCase {
    public function test_toArray() {
        $as = DummyAirspace1::create();
        $asRest = RestAirspace::toArray($as);

        $this->assertEquals($as->id, $asRest["id"]);
        $this->assertEquals($as->aip_id, $asRest["aip_id"]);
        $this->assertEquals($as->category, $asRest["category"]);
        $this->assertEquals($as->country, $asRest["country"]);
        $this->assertEquals($as->name, $asRest["name"]);
        $this->assertEquals($as->alt_bottom->value, $asRest["alt_bottom"][0]);
        $this->assertEquals(AltitudeUnit::toString($as->alt_bottom->unit), $asRest["alt_bottom"][1]);
        $this->assertEquals(AltitudeReference::toString($as->alt_bottom->reference), $asRest["alt_bottom"][2]);
        $this->assertEquals($as->alt_top->value, $asRest["alt_top"][0]);
        $this->assertEquals(AltitudeUnit::toString($as->alt_top->unit), $asRest["alt_top"][1]);
        $this->assertEquals(AltitudeReference::toString($as->alt_top->reference), $asRest["alt_top"][2]);
        $this->assertEquals($as->polygon->toArray(), $asRest["polygon"]);
    }
}
