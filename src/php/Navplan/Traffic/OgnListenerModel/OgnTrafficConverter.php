<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerModel;

use Navplan\Traffic\DomainModel\TrafficAcType;
use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficOgn;


class OgnTrafficConverter {
    public static function fromDbResult(array $rs): TrafficOgn {
        return new TrafficOgn(
            new TrafficAddress(
                $rs["address"],
                TrafficAddressType::fromString($rs["addressType"])
            ),
            TrafficAcType::fromString($rs["acType"]),
            [OgnTrafficPositionConverter::fromDbResult($rs)]
        );
    }
}
