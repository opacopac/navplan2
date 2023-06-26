<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest\Model;

use Navplan\Traffic\Domain\Model\TrafficAddress;
use Navplan\Traffic\Domain\Model\TrafficAddressType;


class RestTrafficAddressConverter {
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
