<?php declare(strict_types=1);

namespace Navplan\VerticalMap\RestModel;

use Navplan\Common\RestModel\RestLengthConverter;
use Navplan\VerticalMap\DomainModel\VerticalMapAirspaceStep;


class VerticalMapAirspaceStepConverter {
    public static function toRest(VerticalMapAirspaceStep $vmAirspaceStep): array {
        return array(
            "stepIdx" => $vmAirspaceStep->stepIdx,
            "botAlt" => RestLengthConverter::toRest($vmAirspaceStep->botAlt),
            "topAlt" => RestLengthConverter::toRest($vmAirspaceStep->topAlt),
        );
    }
}
