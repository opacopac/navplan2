<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use Navplan\Traffic\Domain\TrafficOgn;
use Navplan\Traffic\Domain\TrafficAcType;


class RestTrafficOgn {
    public static function toRest(TrafficOgn $traffic): array {
        return array(
            "address" => RestTrafficAddress::toRest($traffic->address),
            "actype" => TrafficAcType::toString($traffic->acType),
            "poslist" => array_map(
                function ($traffic) { return RestTrafficPosition::toRest($traffic); },
                $traffic->positionList
            )
        );
    }
}
