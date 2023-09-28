<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section4;

use DateInterval;


class DummyForecastTime {
    public static function create(): DateInterval {
        return new DateInterval("PT12H") ;
    }


    public static function createData(): string {
        return pack("CN", 1, 12);
    }
}
