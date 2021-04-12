<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;

use Navplan\Traffic\DomainModel\TrafficAcType;
use Navplan\Traffic\DomainModel\TrafficOgn;


class TrafficOgnConverter {
    public static function toRest(TrafficOgn $traffic): array {
        return array(
            "addr" => TrafficAddressConverter::toRest($traffic->address),
            "actype" => TrafficAcType::toString($traffic->acType),
            "poslist" => array_map(
                function ($traffic) { return TrafficPositionConverter::toRest($traffic); },
                $traffic->positionList
            )
        );
    }
}
