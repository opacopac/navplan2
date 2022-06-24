<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\DomainModel\ForecastStep;


class RestForecastStepConverter {
    const ARG_INTERVAL = "step";
    const ARG_RUN = "run";


    public static function fromRest(array $args): ForecastStep {
        return new ForecastStep(
            StringNumberHelper::parseStringOrError($args, self::ARG_RUN),
            StringNumberHelper::parseIntOrError($args, self::ARG_INTERVAL)
        );
    }
}
