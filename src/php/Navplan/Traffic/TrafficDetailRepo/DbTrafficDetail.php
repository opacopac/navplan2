<?php declare(strict_types=1);

namespace Navplan\Traffic\TrafficDetailRepo;

use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficDetail;


class DbTrafficDetail {
    public static function fromLfrChResult(array $rs): TrafficDetail {
        return new TrafficDetail(
            new TrafficAddress($rs["icaohex"], TrafficAddressType::ICAO),
            $rs["registration"],
            $rs["aircraftModelType"],
            $rs["manufacturer"],
            NULL,
            NULL,
            NULL
        );
    }


    public static function fromBasestationResult(array $rs): TrafficDetail {
        return new TrafficDetail(
            new TrafficAddress($rs["mode_s"], TrafficAddressType::ICAO),
            $rs["registration"],
            NULL,
            $rs["manufacturer"],
            $rs["icao_type_code"] !== '0000' ? $rs["icao_type_code"] : NULL,
            NULL,
            NULL
        );
    }


    public static function fromIcaoAcTypeResult(array $rs): TrafficDetail {
        return new TrafficDetail(
            NULL,
            NULL,
            $rs["model"],
            $rs["manufacturer"],
            $rs["designator"],
            $rs["ac_type"],
            $rs["eng_type"]
        );
    }
}
