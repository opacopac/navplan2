<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest\Model;

use Navplan\Traffic\Domain\Model\TrafficAcType;
use Navplan\Traffic\Domain\Model\TrafficOgn;


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
