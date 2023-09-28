<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use InvalidArgumentException;
use Navplan\Enroute\Domain\Model\AirspaceType;


class OpenAipAirspaceTypeConverter {
    public static function fromRest(int $restAirspaceType): AirspaceType {
        return match ($restAirspaceType) {
            0 => AirspaceType::OTHER,
            1 => AirspaceType::RESTRICTED,
            2 => AirspaceType::DANGER,
            3 => AirspaceType::PROHIBITED,
            4 => AirspaceType::CTR,
            5 => AirspaceType::TMZ,
            6 => AirspaceType::RMZ,
            7 => AirspaceType::TMA,
            8 => AirspaceType::TRA,
            9 => AirspaceType::TSA,
            10 => AirspaceType::FIR,
            11 => AirspaceType::UIR,
            12 => AirspaceType::ADIZ,
            13 => AirspaceType::ATZ,
            14 => AirspaceType::MATZ,
            15 => AirspaceType::AIRWAY,
            16 => AirspaceType::MTR,
            17 => AirspaceType::ALERT_AREA,
            18 => AirspaceType::WARNING_AREA,
            19 => AirspaceType::PROTECTED_AREA,
            20 => AirspaceType::HTZ,
            21 => AirspaceType::GLIDING,
            22 => AirspaceType::TRP,
            23 => AirspaceType::TIZ,
            24 => AirspaceType::TIA,
            25 => AirspaceType::MTA,
            26 => AirspaceType::CTA,
            27 => AirspaceType::ACC,
            28 => AirspaceType::SPORT_RECREATION,
            29 => AirspaceType::LOW_ALT_RESTRICTION,
            default => throw new InvalidArgumentException("unknown airspace type '" . $restAirspaceType . "'"),
        };
    }
}
