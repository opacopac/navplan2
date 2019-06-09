<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;


class RestTrafficListResponse {
    public static function toRest(array $trafficList): array  {
        return array(
            "aclist" => array_map(
                function ($traffic) { return RestTraffic::toRest($traffic); },
                $trafficList
            )
        );
    }
}
