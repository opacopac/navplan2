<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;

use Navplan\Traffic\DomainModel\TrafficAdsbexWithDetail;


class TrafficAdsbexWithDetailsConverter {
    public static function toRest(TrafficAdsbexWithDetail $traffic): array {
        return array(
            "addr" => TrafficAddressConverter::toRest($traffic->adsbTraffic->address),
            "icaotype" => $traffic->adsbTraffic->icaoType,
            "reg" => $traffic->adsbTraffic->registration,
            "call" => $traffic->adsbTraffic->callsign,
            "opicao" => $traffic->adsbTraffic->opIcao,
            "acclass" => $traffic->acClass,
            "engclass" => $traffic->engClass,
            "poslist" => array_map(
                function ($traffic) { return TrafficPositionConverter::toRest($traffic); },
                $traffic->adsbTraffic->positionList
            )
        );
    }
}
