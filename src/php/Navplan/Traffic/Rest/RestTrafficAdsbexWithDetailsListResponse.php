<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;


class RestTrafficAdsbexWithDetailsListResponse {
    public static function toRest(array $trafficList): array  {
        return array(
            "aclist" => array_map(
                function ($traffic) { return RestTrafficAdsbexWithDetails::toRest($traffic); },
                $trafficList
            )
        );
    }
}
