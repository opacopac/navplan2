<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use Navplan\Traffic\Domain\TrafficDetail;


class RestTrafficDetailListResponse {
    public static function toRest(array $trafficDetailList): array  {
        return array(
            "aclist" => array_map(
                function (TrafficDetail $trafficDetail) { return RestTrafficDetail::toRest($trafficDetail); },
                $trafficDetailList
            )
        );
    }
}
