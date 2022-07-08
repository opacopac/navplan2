<?php declare(strict_types=1);

namespace Navplan\DataImport\OpenAip\RestModel;

use InvalidArgumentException;
use Navplan\Common\DomainModel\FrequencyUnit;


class OpenAipRestFrequencyUnitConverter {
    public static function fromRest(int $restFrequencyUnit): FrequencyUnit {
        switch ($restFrequencyUnit) {
            case 1 : return FrequencyUnit::KHZ;
            case 2 : return FrequencyUnit::MHZ;
        }

        throw new InvalidArgumentException("unknown frequency unit '" . $restFrequencyUnit . "'");
    }
}
