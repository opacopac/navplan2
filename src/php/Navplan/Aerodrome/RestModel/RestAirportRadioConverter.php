<?php declare(strict_types=1);

namespace Navplan\Aerodrome\RestModel;

use Navplan\Aerodrome\DomainModel\AirportRadio;
use Navplan\Common\RestModel\RestFrequencyConverter;


class RestAirportRadioConverter {
    public static function toRest(AirportRadio $radio): array {
        return array(
            "type" => $radio->type->value,
            "category" => $radio->category,
            "name" => $radio->name,
            "frequency" => RestFrequencyConverter::toRest($radio->frequency),
            "is_primary" => $radio->isPrimary,
        );
    }
}
