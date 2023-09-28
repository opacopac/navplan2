<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use InvalidArgumentException;
use Navplan\Common\Domain\Model\FrequencyUnit;


class OpenAipFrequencyUnitConverter {
    public static function fromRest(int $restFrequencyUnit): FrequencyUnit {
        switch ($restFrequencyUnit) {
            case 1 : return FrequencyUnit::KHZ;
            case 2 : return FrequencyUnit::MHZ;
        }

        throw new InvalidArgumentException("unknown frequency unit '" . $restFrequencyUnit . "'");
    }
}
