<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;

use Navplan\Traffic\DomainModel\TrafficAcType;
use Navplan\Traffic\DomainModel\TrafficOgn;


class RestTrafficOgnConverter {
    public static function toRest(TrafficOgn $traffic): array {
        return array(
            "addr" => RestTrafficAddressConverter::toRest($traffic->address),
            "actype" => TrafficAcType::toString($traffic->acType),
            "poslist" => array_map(
                function ($traffic) { return RestTrafficPositionConverter::toRest($traffic); },
                $traffic->positionList
            )
        );
    }
}
