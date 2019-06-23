<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use Navplan\Shared\StringNumberHelper;
use Navplan\Traffic\Domain\TrafficDetail;


class RestTrafficDetail {
    public static function fromRest(array $rest): TrafficDetail {
        return new TrafficDetail(
            isset($rest["addr"]) ? RestTrafficAddress::fromRest($rest["addr"]) : NULL,
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
            "addr" => $traffic->address ? RestTrafficAddress::toRest($traffic->address) : NULL,
            "reg" => $traffic->registration,
            "model" => $traffic->model,
            "manufacturer" => $traffic->manufacturer,
            "ac_type" => $traffic->icaoAcType,
            "ac_class" => $traffic->acClass,
            "eng_class" => $traffic->engClass
        );
    }
}
