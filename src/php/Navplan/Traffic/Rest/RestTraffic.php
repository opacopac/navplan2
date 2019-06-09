<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use Navplan\Traffic\Domain\Traffic;
use Navplan\Traffic\Domain\TrafficAcType;
use Navplan\Traffic\Domain\TrafficAddressType;


class RestTraffic {
    public static function toRest(Traffic $traffic): array {
        return array(
            "acAddress" => $traffic->acAddress,
            "addressType" => TrafficAddressType::toString($traffic->addressType),
            "acType" => TrafficAcType::toString($traffic->acType),
            "icaoType" => $traffic->icaoType,
            "registration" => $traffic->registration,
            "callsign" => $traffic->callsign,
            "opIcao" => $traffic->opIcao,
            "acModel" => $traffic->acModel,
            "positionList" => array_map(
                function ($traffic) { return RestTrafficPosition::toRest($traffic); },
                $traffic->positionList
            )
        );
    }
}
