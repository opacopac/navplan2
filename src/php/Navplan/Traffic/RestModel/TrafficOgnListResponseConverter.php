<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;


class TrafficOgnListResponseConverter {
    public static function toRest(array $trafficList): array  {
        return array(
            "aclist" => array_map(
                function ($traffic) { return TrafficOgnConverter::toRest($traffic); },
                $trafficList
            )
        );
    }
}
