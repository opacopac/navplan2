<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\OpenAip\Domain\AirportRadio;


class RestAirportRadio {
    public static function toArray(AirportRadio $radio): array {
        return array(
            "category" => $radio->category,
            "frequency" => $radio->frequency,
            "type" => $radio->type,
            "typespec" => $radio->typespec,
            "description" => $radio->description,
        );
    }
}
