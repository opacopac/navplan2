<?php declare(strict_types=1);

namespace Navplan\Traffic\Ogn\Model;

use Navplan\Traffic\Domain\Model\TrafficAcType;
use Navplan\Traffic\Domain\Model\TrafficAddress;
use Navplan\Traffic\Domain\Model\TrafficAddressType;
use Navplan\Traffic\Domain\Model\TrafficOgn;


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
