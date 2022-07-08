<?php declare(strict_types=1);

namespace Navplan\DataImport\OpenAip\RestModel;

use Navplan\Common\DomainModel\Altitude;
use Navplan\Common\DomainModel\AltitudeReference;
use Navplan\Common\DomainModel\AltitudeUnit;


class OpenAipRestElevationConverter {
    public static function fromRest(array $restElevation): Altitude {
        return new Altitude(
            $restElevation["value"],
            AltitudeUnit::M,
            AltitudeReference::MSL
        );
    }
}
