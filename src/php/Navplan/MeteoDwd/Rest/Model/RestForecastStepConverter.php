<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Rest\Model;

use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\Domain\Model\ForecastStep;


class RestForecastStepConverter {
    const ARG_INTERVAL = "step";
    const ARG_RUN = "run";


    public static function fromRest(array $args): ?ForecastStep {
        if (!isset($args[self::ARG_RUN]) || !isset($args[self::ARG_INTERVAL])) {
            return null;
        }

        return new ForecastStep(
            StringNumberHelper::parseStringOrError($args, self::ARG_RUN),
            StringNumberHelper::parseIntOrError($args, self::ARG_INTERVAL)
        );
    }


    public static function toRest(ForecastStep $forecastStep): array {
        return [
            self::ARG_RUN => $forecastStep->runName,
            self::ARG_INTERVAL => $forecastStep->step
        ];
    }
}
