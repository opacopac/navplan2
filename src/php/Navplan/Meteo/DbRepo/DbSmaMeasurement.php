<?php declare(strict_types=1);

namespace Navplan\Meteo\DbRepo;

use Navplan\Geometry\Domain\Time;
use Navplan\Geometry\Domain\Timestamp;
use Navplan\Geometry\Domain\TimeUnit;
use Navplan\Meteo\Domain\SmaMeasurement;
use Navplan\Shared\StringNumberService;
use Navplan\System\UseCase\ITimeService;


class DbSmaMeasurement {
    public static function fromDbResult(array $rs, ITimeService $timeService): SmaMeasurement {
        return new SmaMeasurement(
            DbSmaStation::fromDbResult($rs),
            self::getTimestamp($rs, $timeService),
            StringNumberService::parseFloatOrNull($rs, "temp_c"),
            self::getSunTime($rs),
            StringNumberService::parseFloatOrNull($rs, "precip_mm"),
            StringNumberService::parseIntOrNull($rs, "wind_dir"),
            StringNumberService::parseFloatOrNull($rs, "wind_speed_kmh"),
            StringNumberService::parseFloatOrNull($rs, "wind_gusts_kmh"),
            StringNumberService::parseFloatOrNull($rs, "qnh_hpa"),
            StringNumberService::parseIntOrNull($rs, "humidity_pc")
        );
    }


    private static function getTimestamp(array $rs, ITimeService $timeService): Timestamp {
        return Timestamp::fromS(
            $timeService->strtotime($rs["measurement_time"] . " UTC")
        );
    }


    private static function getSunTime(array $rs): ?Time {
        $valueMin = StringNumberService::parseFloatOrNull($rs, "sun_min");
        if ($valueMin === NULL) {
            return NULL;
        }

        return new Time($valueMin, TimeUnit::MIN);
    }
}
