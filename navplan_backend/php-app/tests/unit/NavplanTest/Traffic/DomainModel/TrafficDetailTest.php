<?php declare(strict_types=1);

namespace NavplanTest\Traffic\DomainModel;

use Navplan\Traffic\Domain\Model\TrafficAddress;
use Navplan\Traffic\Domain\Model\TrafficAddressType;
use Navplan\Traffic\Domain\Model\TrafficDetail;
use NavplanTest\Traffic\Mocks\DummyTrafficDetailResult1;
use PHPUnit\Framework\TestCase;


class TrafficDetailTest extends TestCase {
    public function test_create_instance() {
        $trafficDetail1 = DummyTrafficDetailResult1::create();

        $this->assertNotNull($trafficDetail1);
    }


    public function test_converts_argumets_to_upper_case() {
        $trafficDetail1 = new TrafficDetail(
            new TrafficAddress('c0ffee', TrafficAddressType::ICAO),
            'hb-sra',
            NULL,
            NULL,
            'aat3',
            'l',
            'p'
        );

        $this->assertNotNull($trafficDetail1);
        $this->assertEquals('C0FFEE', $trafficDetail1->address->value);
        $this->assertEquals('HB-SRA', $trafficDetail1->registration);
        $this->assertEquals('AAT3', $trafficDetail1->icaoAcType);
        $this->assertEquals('L', $trafficDetail1->acClass);
        $this->assertEquals('P', $trafficDetail1->engClass);
    }
}
