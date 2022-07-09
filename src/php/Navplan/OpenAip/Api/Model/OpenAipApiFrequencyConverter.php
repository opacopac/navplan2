<?php declare(strict_types=1);

namespace Navplan\OpenAip\Api\Model;

use Navplan\Common\DomainModel\Frequency;


class OpenAipApiFrequencyConverter {
    public static function fromRest(array $restFrequency): Frequency {
        return new Frequency(
            floatval($restFrequency["value"]),
            OpenAipApiFrequencyUnitConverter::fromRest($restFrequency["unit"])
        );
    }
}
