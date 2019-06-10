<?php declare(strict_types=1);

namespace Navplan\Traffic\Rest;

use Navplan\Shared\StringNumberService;
use Navplan\Traffic\Domain\TrafficDetail;


class RestTrafficDetail {
    public static function fromRest(array $rest): TrafficDetail {
        return new TrafficDetail(
            StringNumberService::parseStringOrError($rest, "icao24"),
            StringNumberService::parseStringOrNull($rest, "reg"),
            StringNumberService::parseStringOrNull($rest, "model"),
            StringNumberService::parseStringOrNull($rest, "manufacturer"),
            StringNumberService::parseStringOrNull($rest, "ac_type"),
            StringNumberService::parseStringOrNull($rest, "ac_class"),
            StringNumberService::parseStringOrNull($rest, "eng_class")
        );
    }


    public static function toRest(TrafficDetail $traffic): array {
        return array(
            "icao24" => $traffic->icao24,
            "reg" => $traffic->registration,
            "model" => $traffic->model,
            "manufacturer" => $traffic->manufacturer,
            "ac_type" => $traffic->icaoAcType,
            "ac_class" => $traffic->acClass,
            "eng_class" => $traffic->engClass
        );
    }
}
