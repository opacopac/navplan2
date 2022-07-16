<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\Common\DomainModel\Frequency;


class OpenAipFrequencyConverter {
    public static function fromRest(array $restFrequency): Frequency {
        return new Frequency(
            floatval($restFrequency["value"]),
            OpenAipFrequencyUnitConverter::fromRest($restFrequency["unit"])
        );
    }
}
