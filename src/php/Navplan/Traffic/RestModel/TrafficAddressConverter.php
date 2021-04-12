<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;

use Navplan\Traffic\DomainModel\TrafficAddress;
use Navplan\Traffic\DomainModel\TrafficAddressType;


class TrafficAddressConverter {
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
