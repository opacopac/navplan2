<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;


class RestTrafficOgnListResponse {
    public static function toRest(array $trafficList): array  {
        return array(
            "aclist" => array_map(
                function ($traffic) { return RestTrafficOgn::toRest($traffic); },
                $trafficList
            )
        );
    }
}
