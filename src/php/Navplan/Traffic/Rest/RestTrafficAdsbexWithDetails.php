<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use Navplan\Traffic\Domain\TrafficAdsbexWithDetail;


class RestTrafficAdsbexWithDetails {
    public static function toRest(TrafficAdsbexWithDetail $traffic): array {
        return array(
            "addr" => RestTrafficAddress::toRest($traffic->adsbTraffic->address),
            "icaotype" => $traffic->adsbTraffic->icaoType,
            "reg" => $traffic->adsbTraffic->registration,
            "call" => $traffic->adsbTraffic->callsign,
            "opicao" => $traffic->adsbTraffic->opIcao,
            "acclass" => $traffic->acClass,
            "engclass" => $traffic->engClass,
            "poslist" => array_map(
                function ($traffic) { return RestTrafficPosition::toRest($traffic); },
                $traffic->adsbTraffic->positionList
            )
        );
    }
}
