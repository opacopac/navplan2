<?php declare(strict_types=1);

namespace Navplan\OpenAip\ApiAdapter\Model;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\AltitudeReference;
use Navplan\Common\Domain\Model\AltitudeUnit;


class OpenAipElevationConverter {
    public static function fromRest(array $restElevation): Altitude {
        return new Altitude(
            $restElevation["value"],
            AltitudeUnit::M,
            AltitudeReference::MSL
        );
    }
}
