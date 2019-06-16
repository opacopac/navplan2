<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;


class RestTrafficAdsbexListResponse {
    public static function toRest(array $trafficList): array  {
        return array(
            "aclist" => array_map(
                function ($traffic) { return RestTrafficAdsbex::toRest($traffic); },
                $trafficList
            )
        );
    }
}
