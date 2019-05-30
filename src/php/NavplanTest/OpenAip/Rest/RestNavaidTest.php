<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Rest;

use Navplan\OpenAip\Rest\RestNavaid;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use PHPUnit\Framework\TestCase;


class RestNavaidTest extends TestCase {
    public function test_toArray() {
        $navaid = DummyNavaid1::create();
        $navaidRest = RestNavaid::toArray($navaid);

        $this->assertEquals($navaid->id, $navaidRest["id"]);
        $this->assertEquals($navaid->type, $navaidRest["type"]);
        $this->assertEquals($navaid->kuerzel, $navaidRest["kuerzel"]);
        $this->assertEquals($navaid->name, $navaidRest["name"]);
        $this->assertEquals($navaid->position->latitude, $navaidRest["latitude"]);
        $this->assertEquals($navaid->position->longitude, $navaidRest["longitude"]);
        $this->assertEquals($navaid->elevation, $navaidRest["elevation"]);
        $this->assertEquals($navaid->frequency, $navaidRest["frequency"]);
        $this->assertEquals($navaid->unit, $navaidRest["unit"]);
        $this->assertEquals($navaid->declination, $navaidRest["declination"]);
        $this->assertEquals($navaid->truenorth, $navaidRest["truenorth"]);
    }
}
