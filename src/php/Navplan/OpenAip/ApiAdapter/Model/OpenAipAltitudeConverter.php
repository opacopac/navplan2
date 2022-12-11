<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;


class OpenAipAltitudeConverter {
    public static function fromRest(array $rest): Altitude {
        $unit = self::convertUnit(intval($rest["unit"]));
        $ref = self::convertReference(intval($rest["referenceDatum"]));
        $value = intval($rest["value"]);

        // auto correct bad data
        if ($unit === AltitudeUnit::FL && $ref !== AltitudeReference::STD) {
            $ref = AltitudeReference::STD;
        }

        // auto convert M to FT
        if ($unit == AltitudeUnit::M) {
            $unit = AltitudeUnit::FT;
            $value = round(Length::convert($value, LengthUnit::M, LengthUnit::FT));
        }

        return new Altitude(
            $value,
            $unit,
            $ref
        );
    }


    private static function convertUnit(int $value): AltitudeUnit {
        return match ($value) {
            0 => AltitudeUnit::M,
            1 => AltitudeUnit::FT,
            6 => AltitudeUnit::FL,
            default => throw new InvalidArgumentException("error converting openaip altitude unit " . $value),
        };
    }


    private static function convertReference(int $value): AltitudeReference {
        return match ($value) {
            0 => AltitudeReference::GND,
            1 => AltitudeReference::MSL,
            2 => AltitudeReference::STD,
            default => throw new InvalidArgumentException("error converting openaip altitude reference datum " . $value),
        };
    }
}
