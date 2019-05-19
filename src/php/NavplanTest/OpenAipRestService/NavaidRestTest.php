<?php declare(strict_types=1);

namespace NavplanTest\OpenAipRestService;

use Navplan\OpenAip\Domain\Navaid;
use Navplan\OpenAipRestService\NavaidRest;
use PHPUnit\Framework\TestCase;


class NavaidRestTest extends TestCase {
    private function createDummyNavaid1(): Navaid {
        return new Navaid(
            1218,
            "VOR-DME",
            "FRI",
            "FRIBOURG",
            46.7775,
            7.22361,
            799,
            "110.85",
            "MHz",
            1.34846,
            false
        );
    }


    public function test_toArray() {
        $navaid = $this->createDummyNavaid1();
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
