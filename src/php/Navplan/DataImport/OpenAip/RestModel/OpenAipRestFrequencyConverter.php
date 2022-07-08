<?php declare(strict_types=1);

namespace Navplan\DataImport\OpenAip\RestModel;

use Navplan\Common\DomainModel\Frequency;


class OpenAipRestFrequencyConverter {
    public static function fromRest(array $restFrequency): Frequency {
        return new Frequency(
            floatval($restFrequency["value"]),
            OpenAipRestFrequencyUnitConverter::fromRest($restFrequency["unit"])
        );
    }
}
