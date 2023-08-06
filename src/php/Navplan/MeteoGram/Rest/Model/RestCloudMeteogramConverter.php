<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Rest\Model;

use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\MeteoGram\Domain\Model\CloudMeteogram;


class RestCloudMeteogramConverter {
    const ARG_ELEVATION = "elevation";
    const ARG_STEPS = "steps";


    public static function toRest(CloudMeteogram $cloudMeteogram): array {
        return [
            self::ARG_ELEVATION => RestLengthConverter::toRest($cloudMeteogram->heightAmsl),
            self::ARG_STEPS => RestCloudMeteogramStepConverter::toRestList($cloudMeteogram->cloudMeteogramSteps)
        ];
    }
}
