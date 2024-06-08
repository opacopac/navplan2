<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use InvalidArgumentException;
use Navplan\Airspace\Domain\Model\AirspaceClass;


class OpenAipAirspaceClassConverter {
    public static function fromRest(int $restAirspaceClass): AirspaceClass {
        return match ($restAirspaceClass) {
            0 => AirspaceClass::A,
            1 => AirspaceClass::B,
            2 => AirspaceClass::C,
            3 => AirspaceClass::D,
            4 => AirspaceClass::E,
            5 => AirspaceClass::F,
            6 => AirspaceClass::G,
            7 => AirspaceClass::SUA,
            8 => AirspaceClass::UNCLASSIFIED,
            default => throw new InvalidArgumentException("unknown airspace class '" . $restAirspaceClass . "'"),
        };
    }
}
