<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\RestService;

use Navplan\OpenAip\Domain\Navaid;
use Navplan\OpenAip\RestService\NavaidRest;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use PHPUnit\Framework\TestCase;


class NavaidRestTest extends TestCase {
    public function test_toArray() {
        $navaid = DummyNavaid1::create();
        $navaidRest = NavaidRest::toArray($navaid);

        $this->assertEquals($navaid->id, $navaidRest["id"]);
        $this->assertEquals($navaid->type, $navaidRest["type"]);
        $this->assertEquals($navaid->kuerzel, $navaidRest["kuerzel"]);
        $this->assertEquals($navaid->name, $navaidRest["name"]);
        $this->assertEquals($navaid->latitude, $navaidRest["latitude"]);
        $this->assertEquals($navaid->longitude, $navaidRest["longitude"]);
        $this->assertEquals($navaid->elevation, $navaidRest["elevation"]);
        $this->assertEquals($navaid->frequency, $navaidRest["frequency"]);
        $this->assertEquals($navaid->unit, $navaidRest["unit"]);
        $this->assertEquals($navaid->declination, $navaidRest["declination"]);
        $this->assertEquals($navaid->truenorth, $navaidRest["truenorth"]);
    }
}
