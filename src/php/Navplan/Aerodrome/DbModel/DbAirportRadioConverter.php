<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbModel;

use Navplan\Aerodrome\DomainModel\AirportRadio;


class DbAirportRadioConverter {
    public static function fromDbRow(array $row): AirportRadio {
        return new AirportRadio(
            $row["category"],
            $row["frequency"],
            $row["type"],
            $row["typespec"],
            $row["description"]
        );
    }
}
