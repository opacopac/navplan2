<?php declare(strict_types=1);

namespace Navplan\Traffic\OgnListenerModel;

use Navplan\Traffic\DomainModel\TrafficAcType;
use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;
use Navplan\Traffic\DomainModel\TrafficOgn;


class OgnTrafficConverter {
    public static function fromDbRow(array $row): TrafficOgn {
        return new TrafficOgn(
            new TrafficAddress(
                $row["address"],
                TrafficAddressType::fromString($row["addressType"])
            ),
            TrafficAcType::fromString($row["acType"]),
            [OgnTrafficPositionConverter::fromDbRow($row)]
        );
    }
}
