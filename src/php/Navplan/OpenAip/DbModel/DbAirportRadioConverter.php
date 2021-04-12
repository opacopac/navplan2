<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbModel;

use Navplan\OpenAip\DomainModel\AirportRadio;


class DbAirportRadioConverter {
    public static function fromDbResult(array $rs): AirportRadio {
        return new AirportRadio(
            $rs["category"],
            $rs["frequency"],
            $rs["type"],
            $rs["typespec"],
            $rs["description"]
        );
    }
}
