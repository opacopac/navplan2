<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;

use Navplan\Traffic\DomainModel\TrafficDetail;


class TrafficDetailListResponseConverter {
    public static function toRest(array $trafficDetailList): array  {
        return array(
            "aclist" => array_map(
                function (TrafficDetail $trafficDetail) { return TrafficDetailConverter::toRest($trafficDetail); },
                $trafficDetailList
            )
        );
    }
}
