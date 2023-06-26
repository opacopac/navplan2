<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Persistence\Model;

use Navplan\Common\Domain\Model\Time;
use Navplan\Common\Domain\Model\Timestamp;
use Navplan\Common\Domain\Model\TimeUnit;
use Navplan\Common\StringNumberHelper;
use Navplan\MeteoSma\Domain\Model\SmaMeasurement;
use Navplan\System\Domain\Service\ITimeService;


class DbSmaMeasurementConverter {
    public static function fromDbRow(array $row, ITimeService $timeService): SmaMeasurement {
        return new SmaMeasurement(
            DbSmaStationConverter::fromDbRow($row),
            self::getTimestamp($row, $timeService),
            StringNumberHelper::parseFloatOrNull($row, "temp_c"),
            self::getSunTime($row),
            StringNumberHelper::parseFloatOrNull($row, "precip_mm"),
            StringNumberHelper::parseIntOrNull($row, "wind_dir"),
            StringNumberHelper::parseFloatOrNull($row, "wind_speed_kmh"),
            StringNumberHelper::parseFloatOrNull($row, "wind_gusts_kmh"),
            StringNumberHelper::parseFloatOrNull($row, "qnh_hpa"),
            StringNumberHelper::parseIntOrNull($row, "humidity_pc")
        );
    }


    private static function getTimestamp(array $rs, ITimeService $timeService): Timestamp {
        return Timestamp::fromS(
            $timeService->strtotime($rs["measurement_time"] . " UTC")
        );
    }


    private static function getSunTime(array $rs): ?Time {
        $valueMin = StringNumberHelper::parseFloatOrNull($rs, "sun_min");
        if ($valueMin === NULL) {
            return NULL;
        }

        return new Time($valueMin, TimeUnit::M);
    }
}
