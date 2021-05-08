<?php declare(strict_types=1);

namespace Navplan\Airport\RestModel;

use Navplan\Airport\DomainModel\AirportRadio;


class RestAirportRadioConverter {
    public static function toRest(AirportRadio $radio): array {
        return array(
            "category" => $radio->category,
            "frequency" => $radio->frequency,
            "type" => $radio->type,
            "typespec" => $radio->typespec,
            "description" => $radio->description,
        );
    }
}
