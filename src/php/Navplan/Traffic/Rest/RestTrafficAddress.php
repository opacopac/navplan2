<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use Navplan\Traffic\Domain\TrafficAddress;
use Navplan\Traffic\Domain\TrafficAddressType;


class RestTrafficAddress {
    public static function fromRest(array $restAddress): TrafficAddress {
        return new TrafficAddress(
            $restAddress[0],
            TrafficAddressType::fromString($restAddress[1])
        );
    }


    public static function toRest(TrafficAddress $address): array {
        return [
            $address->value,
            TrafficAddressType::toString($address->type)
        ];
    }
}
