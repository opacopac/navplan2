<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest\Model;


class RestTrafficOgnListResponseConverter {
    public static function toRest(array $trafficList): array  {
        return array(
            "aclist" => array_map(
                function ($traffic) { return RestTrafficOgnConverter::toRest($traffic); },
                $trafficList
            )
        );
    }
}
