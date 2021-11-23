<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;


class RestTrafficAdsbexListResponseConverter {
    public static function toRest(array $trafficList): array  {
        return array(
            "aclist" => array_map(
                function ($traffic) { return RestTrafficAdsbexConverter::toRest($traffic); },
                $trafficList
            )
        );
    }
}
