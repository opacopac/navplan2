<?php declare(strict_types=1);

namespace Navplan\Traffic\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\Traffic\DomainModel\TrafficDetail;


class RestTrafficDetailConverter {
    public static function fromRest(array $rest): TrafficDetail {
        return new TrafficDetail(
            isset($rest["addr"]) ? RestTrafficAddressConverter::fromRest($rest["addr"]) : NULL,
            StringNumberHelper::parseStringOrNull($rest, "reg"),
            StringNumberHelper::parseStringOrNull($rest, "model"),
            StringNumberHelper::parseStringOrNull($rest, "manufacturer"),
            StringNumberHelper::parseStringOrNull($rest, "ac_type"),
            StringNumberHelper::parseStringOrNull($rest, "ac_class"),
            StringNumberHelper::parseStringOrNull($rest, "eng_class")
        );
    }


    public static function toRest(TrafficDetail $traffic): array {
        return array(
            "addr" => $traffic->address ? RestTrafficAddressConverter::toRest($traffic->address) : NULL,
            "reg" => $traffic->registration,
            "model" => $traffic->model,
            "manufacturer" => $traffic->manufacturer,
            "ac_type" => $traffic->icaoAcType,
            "ac_class" => $traffic->acClass,
            "eng_class" => $traffic->engClass
        );
    }
}
