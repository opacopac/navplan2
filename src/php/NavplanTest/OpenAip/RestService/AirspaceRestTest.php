<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\RestService;

use Navplan\OpenAip\RestService\AirspaceRest;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use PHPUnit\Framework\TestCase;


class AirspaceRestTest extends TestCase {
    public function test_toArray() {
        $as = DummyAirspace1::create();
        $asRest = AirspaceRest::toArray($as);

        $this->assertEquals($as->id, $asRest["id"]);
        $this->assertEquals($as->aip_id, $asRest["aip_id"]);
        $this->assertEquals($as->category, $asRest["category"]);
        $this->assertEquals($as->country, $asRest["country"]);
        $this->assertEquals($as->name, $asRest["name"]);
        $this->assertEquals($as->alt_bottom->reference, $asRest["alt"]["bottom"]["ref"]);
        $this->assertEquals($as->alt_bottom->height, $asRest["alt"]["bottom"]["height"]);
        $this->assertEquals($as->alt_bottom->unit, $asRest["alt"]["bottom"]["unit"]);
        $this->assertEquals($as->alt_top->reference, $asRest["alt"]["top"]["ref"]);
        $this->assertEquals($as->alt_top->height, $asRest["alt"]["top"]["height"]);
        $this->assertEquals($as->alt_top->unit, $asRest["alt"]["top"]["unit"]);
        $this->assertEquals($as->polygon->lonLatList, $asRest["polygon"]);
    }
}
