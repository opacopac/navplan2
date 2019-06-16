<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use Navplan\Traffic\Domain\TrafficAdsbex;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class RestTrafficAdsbex {
    public static function toRest(TrafficAdsbex $traffic): array {
        return array(
            "acaddress" => $traffic->acAddress,
            "addresstype" => TrafficAddressType::toString($traffic->addressType),
            "actype" => TrafficAcType::toString($traffic->acType),
            "icaotype" => $traffic->icaoType,
            "registration" => $traffic->registration,
            "callsign" => $traffic->callsign,
            "opicao" => $traffic->opIcao,
            "acmodel" => $traffic->acModel,
            "poslist" => array_map(
                function ($traffic) { return RestTrafficPosition::toRest($traffic); },
                $traffic->positionList
            )
        );
    }
}
