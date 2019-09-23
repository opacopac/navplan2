<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section4;

use Navplan\MeteoGrib2\Domain\Section4\TimeRangeSpecification;


class TimeRangeSpecificationParser {
    public static function parse(int $timeRangeCount, string $data): array {
        $timeRangeSpecList = [];

        for ($i = 0; $i < $timeRangeCount; $i++) {
            $byteArray = unpack("C1a/C1b/C1c/N1d/C1e/N1f", $data);

            $timeRangeSpecList[] = new TimeRangeSpecification(
                $byteArray["a"],
                $byteArray["b"],
                TimeRangeParser::parse($byteArray["c"], $byteArray["d"]),
                TimeRangeParser::parse($byteArray["e"], $byteArray["f"])
            );
        }

        return $timeRangeSpecList;
    }
}
