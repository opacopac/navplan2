<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\Domain\Model\TrafficAddress;
use Navplan\Traffic\Domain\Model\TrafficAddressType;
use Navplan\Traffic\Domain\Model\TrafficDetail;


class DummyBasestationTrafficDetail2 {
    public static function create(): TrafficDetail {
        return new TrafficDetail(
            new TrafficAddress("111111", TrafficAddressType::ICAO),
            NULL,
            NULL,
            NULL,
            NULL,
            NULL,
            NULL
        );
    }


    public static function createDbResult(): array {
        return array(
            'mode_s' => '111111',
            'registration' => NULL,
            'manufacturer' => NULL,
            'icao_type_code' => '0000'
        );
    }
}
