<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DbModel;

use Navplan\Aerodrome\DomainModel\AirportRadio;
use Navplan\Aerodrome\DomainModel\AirportRadioType;
use Navplan\Common\DomainModel\Frequency;
use Navplan\Common\DomainModel\FrequencyUnit;


class DbAirportRadioConverter {
    public static function fromDbRow(array $row): AirportRadio {
        return new AirportRadio(
            $row["category"],
            new Frequency(floatval($row["frequency"]), FrequencyUnit::MHZ),
            AirportRadioType::from($row["type"]),
            $row["description"],
            boolval($row["is_primary"])
        );
    }
}
