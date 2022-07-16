<?php declare(strict_types=1);

namespace Navplan\Enroute\DomainModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\Ring2d;


class Airspace {
    public const CATEGORY_UNKNOWN_STRING = "UNKNOWN";


    public function __construct(
        public int $id,
        public ?AirspaceClass $class,
        public ?AirspaceType $type,
        public string $category,
        public string $country,
        public string $name,
        public Altitude $alt_bottom,
        public Altitude $alt_top,
        public ?Ring2d $polygon
    ) {
    }


    public static function getCategoryString(AirspaceClass $class, AirspaceType $type): string {
        return match ($type) {
            AirspaceType::CTR,
            AirspaceType::DANGER,
            AirspaceType::FIR,
            AirspaceType::GLIDING,
            AirspaceType::PROHIBITED,
            AirspaceType::RESTRICTED,
            AirspaceType::RMZ,
            AirspaceType::TMZ => $type->value,
            default => match ($class) {
                AirspaceClass::A,
                AirspaceClass::B,
                AirspaceClass::C,
                AirspaceClass::D,
                AirspaceClass::E,
                AirspaceClass::F,
                AirspaceClass::G => $class->value,
                default => self::CATEGORY_UNKNOWN_STRING,
            },
        };
    }
}
