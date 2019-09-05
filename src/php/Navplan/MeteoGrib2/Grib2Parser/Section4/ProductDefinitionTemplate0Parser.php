<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section4;

use DateInterval;
use Navplan\MeteoGrib2\Domain\Section4\GeneratingProcess;
use Navplan\MeteoGrib2\Domain\Section4\Parameter;
use Navplan\MeteoGrib2\Domain\Section4\ProductDefinitionTemplate0;


class ProductDefinitionTemplate0Parser {
    public static function parse(string $data): ProductDefinitionTemplate0 {
        $byteArray = unpack("C1a/C1b/C1c/C1d/C1e/n1f/C1g/C1h/N1i/C1j/C1k/N1l/C1m/C1n/N1o", $data);

        return new ProductDefinitionTemplate0(
            new Parameter($byteArray["a"], $byteArray["b"]),
            new GeneratingProcess($byteArray["c"], $byteArray["d"], $byteArray["e"]),
            new DateInterval("PT" . $byteArray["f"] . "H" . $byteArray["g"] . "M"),
            ForecastTimeParser::parse($byteArray["h"], $byteArray["i"]),
            FixedSurfaceParser::parse($byteArray["j"], $byteArray["k"], $byteArray["l"]),
            FixedSurfaceParser::parse($byteArray["m"], $byteArray["n"], $byteArray["o"])
        );
    }
}
