<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\RestModel;

use Navplan\Common\StringNumberHelper;
use Navplan\MeteoDwd\DomainModel\ForecastTime;


class RestForecastTimeConverter {
    const ARG_INTERVAL = "interval";


    public static function fromRest(array $args): ForecastTime {
        return new ForecastTime(
            StringNumberHelper::parseIntOrError($args, self::ARG_INTERVAL)
        );
    }
}
