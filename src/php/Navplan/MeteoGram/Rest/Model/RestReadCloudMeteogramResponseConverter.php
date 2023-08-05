<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Rest\Model;

use Navplan\Common\Rest\Converter\RestLengthConverter;
use Navplan\MeteoGram\Domain\Service\ReadCloudMeteogramResponse;


class RestReadCloudMeteogramResponseConverter {
    const ARG_ELEVATION = "elevation";
    const ARG_STEPS = "steps";


    public static function toRest(ReadCloudMeteogramResponse $response): array {
        return [
            self::ARG_ELEVATION => RestLengthConverter::toRest($response->heightAmsl),
            self::ARG_STEPS => RestCloudMeteogramStepConverter::toRestList($response->cloudMeteogramSteps)
        ];
    }
}
