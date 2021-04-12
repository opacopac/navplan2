<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;


class TrafficAdsbexWithDetailsListResponseConverter {
    public static function toRest(array $trafficList): array  {
        return array(
            "aclist" => array_map(
                function ($traffic) { return TrafficAdsbexWithDetailsConverter::toRest($traffic); },
                $trafficList
            )
        );
    }
}
