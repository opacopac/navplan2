<?php declare(strict_types=1);

namespace Navplan\Traffic\TrafficDetailRepo;

use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficDetail;


class DbTrafficDetailConverter {
    public static function fromLfrChRow(array $row): TrafficDetail {
        return new TrafficDetail(
            new TrafficAddress($row["icaohex"], TrafficAddressType::ICAO),
            $row["registration"],
            $row["aircraftModelType"],
            $row["manufacturer"],
            NULL,
            NULL,
            NULL
        );
    }


    public static function fromBasestationRow(array $row): TrafficDetail {
        return new TrafficDetail(
            new TrafficAddress($row["mode_s"], TrafficAddressType::ICAO),
            $row["registration"],
            NULL,
            $row["manufacturer"],
            $row["icao_type_code"] !== '0000' ? $row["icao_type_code"] : NULL,
            NULL,
            NULL
        );
    }


    public static function fromIcaoAcTypeRow(array $row): TrafficDetail {
        return new TrafficDetail(
            NULL,
            NULL,
            $row["model"],
            $row["manufacturer"],
            $row["designator"],
            $row["ac_type"],
            $row["eng_type"]
        );
    }
}
