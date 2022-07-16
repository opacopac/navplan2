<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DomainModel;


use Navplan\Common\DomainModel\Frequency;

class AirportRadio {
    public function __construct(
        public string $category,
        public Frequency $frequency,
        public AirportRadioType $type,
        public string $name,
        public bool $isPrimary
    ) {
    }


    public static function getCategoryString(AirportRadioType $type): string {
        return match ($type) {
            AirportRadioType::AIRMET,
            AirportRadioType::ATIS,
            AirportRadioType::AWOS,
            AirportRadioType::VOLMET
                => "INFORMATION",
            AirportRadioType::ILS
                => "NAVIGATION",
            default => "COMMUNICATION",
        };
    }
}
