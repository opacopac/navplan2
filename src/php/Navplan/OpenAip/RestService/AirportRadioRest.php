<?php declare(strict_types=1);

namespace Navplan\OpenAip\RestService;

use Navplan\OpenAip\Domain\AirportRadio;


class AirportRadioRest {
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
