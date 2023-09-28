<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest\Model;

use Navplan\Traffic\Domain\Model\TrafficAdsbexWithDetail;


class RestTrafficAdsbexWithDetailsConverter {
    public static function toRest(TrafficAdsbexWithDetail $traffic): array {
        return array(
            "addr" => RestTrafficAddressConverter::toRest($traffic->adsbTraffic->address),
            "icaotype" => $traffic->adsbTraffic->icaoType,
            "reg" => $traffic->adsbTraffic->registration,
            "call" => $traffic->adsbTraffic->callsign,
            "opicao" => $traffic->adsbTraffic->opIcao,
            "acclass" => $traffic->acClass,
            "engclass" => $traffic->engClass,
            "poslist" => array_map(
                function ($traffic) { return RestTrafficPositionConverter::toRest($traffic); },
                $traffic->adsbTraffic->positionList
            )
        );
    }
}
