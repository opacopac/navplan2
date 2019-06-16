<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use Navplan\Traffic\Domain\TrafficAddress;
use Navplan\Traffic\Domain\TrafficAddressType;


class RestTrafficAddress {
    public static function toRest(TrafficAddress $address): array {
        return [
            $address->value,
            TrafficAddressType::toString($address->type)
        ];
    }
}
