<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestModel;

use Navplan\OpenAip\DomainModel\AirportRadio;


class AirportRadioConverter {
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
