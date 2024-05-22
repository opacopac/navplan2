<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use InvalidArgumentException;
use Navplan\Aerodrome\Domain\Model\AirportRadioType;


class OpenAipAirportRadioTypeConverter {
    public static function fromRest(int $restRadioType): AirportRadioType {
        return match ($restRadioType) {
            0 => AirportRadioType::APPROACH,
            1 => AirportRadioType::APRON,
            2 => AirportRadioType::ARRIVAL,
            3 => AirportRadioType::CENTER,
            4 => AirportRadioType::CTAF,
            5 => AirportRadioType::DELIVERY,
            6 => AirportRadioType::DEPARTURE,
            7 => AirportRadioType::FIS,
            8 => AirportRadioType::GLIDING,
            9 => AirportRadioType::GROUND,
            10 => AirportRadioType::INFO,
            11 => AirportRadioType::MULTICOM,
            12 => AirportRadioType::UNICOM,
            13 => AirportRadioType::RADAR,
            14 => AirportRadioType::TOWER,
            15 => AirportRadioType::ATIS,
            16 => AirportRadioType::RADIO,
            17 => AirportRadioType::OTHER,
            18 => AirportRadioType::AIRMET,
            19 => AirportRadioType::AWOS,
            20 => AirportRadioType::LIGHTS,
            21 => AirportRadioType::VOLMET,
            22 => AirportRadioType::AFIS,
            default => throw new InvalidArgumentException("unknown airport radio type '" . $restRadioType . "'"),
        };
    }
}
