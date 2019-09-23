<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section4;

use Navplan\MeteoGrib2\Domain\Section4\GeneratingProcess;
use Navplan\MeteoGrib2\Domain\Section4\Parameter;
use Navplan\MeteoGrib2\Domain\Section4\ProductDefinitionTemplate8;
use Navplan\MeteoGrib2\Grib2Parser\DateTimeParser;
use Navplan\MeteoGrib2\Grib2Parser\HoursMinutesParser;


class ProductDefinitionTemplate8Parser {
    public static function parse(string $data): ProductDefinitionTemplate8 {
        $byteArray = unpack("C1a/C1b/C1c/C1d/C1e/n1f/C1g/C1h/N1i/C1j/C1k/N1l/C1m/C1n/N1o/n1p/C1q/C1r/C1s/C1t/C1u/C1v/N1w/a*x", $data);

        return new ProductDefinitionTemplate8(
            new Parameter($byteArray["a"], $byteArray["b"]),
            new GeneratingProcess($byteArray["c"], $byteArray["d"], $byteArray["e"]),
            HoursMinutesParser::parse($byteArray["f"], $byteArray["g"]),
            TimeRangeParser::parse($byteArray["h"], $byteArray["i"]),
            FixedSurfaceParser::parse($byteArray["j"], $byteArray["k"], $byteArray["l"]),
            FixedSurfaceParser::parse($byteArray["m"], $byteArray["n"], $byteArray["o"]),
            DateTimeParser::parse($byteArray["p"], $byteArray["q"], $byteArray["r"], $byteArray["s"], $byteArray["t"], $byteArray["u"]),
            $byteArray["v"],
            TimeRangeSpecificationParser::parse($byteArray["w"], $byteArray["x"])
        );
    }
}
