<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use InvalidArgumentException;
use Navplan\Common\DomainModel\Length;
use Navplan\Common\DomainModel\LengthUnit;


class OpenAipLengthConverter {
    public static function fromRest(array $rest): Length {
        return new Length(
            intval($rest["value"]),
            self::convertUnit(intval($rest["unit"]))
        );
    }


    private static function convertUnit(int $value): LengthUnit {
        return match ($value) {
            0 => LengthUnit::M,
            default => throw new InvalidArgumentException("error converting openaip length unit " . $value),
        };
    }
}
