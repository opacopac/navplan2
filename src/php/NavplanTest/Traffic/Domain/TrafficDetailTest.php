<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Domain;

use Navplan\Traffic\Domain\TrafficDetail;
use NavplanTest\Traffic\Mocks\DummyTrafficDetailResult1;
use PHPUnit\Framework\TestCase;


class TrafficDetailTest extends TestCase {
    public function test_create_instance() {
        $trafficDetail1 = DummyTrafficDetailResult1::create();

        $this->assertNotNull($trafficDetail1);
    }


    public function test_converts_argumets_to_upper_case() {
        $trafficDetail1 = new TrafficDetail(
            'c0ffee',
            'hb-sra',
            NULL,
            NULL,
            'aat3',
            'l',
            'p'
        );

        $this->assertNotNull($trafficDetail1);
        $this->assertEquals('C0FFEE', $trafficDetail1->icao24);
        $this->assertEquals('HB-SRA', $trafficDetail1->registration);
        $this->assertEquals('AAT3', $trafficDetail1->icaoAcType);
        $this->assertEquals('L', $trafficDetail1->acClass);
        $this->assertEquals('P', $trafficDetail1->engClass);
    }
}
