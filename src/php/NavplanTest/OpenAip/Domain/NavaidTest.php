<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Domain;

use PHPUnit\Framework\TestCase;
use Navplan\OpenAip\Domain\Navaid;


class NavaidTest extends TestCase {
    protected function setUp(): void {
        parent::setUp();
    }


    private function getMockNavaid1Values(): array {
        return array(
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


    private function createMockNavaid1(): Navaid {
        $values = $this->getMockNavaid1Values();
        return new Navaid(
            $values[0],
            $values[1],
            $values[2],
            $values[3],
            $values[4],
            $values[5],
            $values[6],
            $values[7],
            $values[8],
            $values[9],
            $values[10]
        );
    }


    public function test_create_instance() {
        $values = $this->getMockNavaid1Values();
        $navaid = $this->createMockNavaid1();
        $this->assertNotNull($navaid);
        $this->assertEquals($values[0], $navaid->id);
        $this->assertEquals($values[1], $navaid->type);
        $this->assertEquals($values[2], $navaid->kuerzel);
        $this->assertEquals($values[3], $navaid->name);
        $this->assertEquals($values[4], $navaid->latitude);
        $this->assertEquals($values[5], $navaid->longitude);
        $this->assertEquals($values[6], $navaid->elevation);
        $this->assertEquals($values[7], $navaid->frequency);
        $this->assertEquals($values[8], $navaid->unit);
        $this->assertEquals($values[9], $navaid->declination);
        $this->assertEquals($values[10], $navaid->truenorth);
    }
}
