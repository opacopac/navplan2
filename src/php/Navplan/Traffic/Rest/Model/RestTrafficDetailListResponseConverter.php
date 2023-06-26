<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest\Model;

use Navplan\Traffic\Domain\Model\TrafficDetail;


class RestTrafficDetailListResponseConverter {
    public static function toRest(array $trafficDetailList): array  {
        return array(
            "aclist" => array_map(
                function (TrafficDetail $trafficDetail) { return RestTrafficDetailConverter::toRest($trafficDetail); },
                $trafficDetailList
            )
        );
    }
}
