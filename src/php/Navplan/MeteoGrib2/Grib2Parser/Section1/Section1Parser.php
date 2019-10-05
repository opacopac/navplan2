<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section1;

use Navplan\MeteoGrib2\Domain\Section1\Origin;
use Navplan\MeteoGrib2\Domain\Section1\IdentificationSection;
use Navplan\MeteoGrib2\Domain\Section1\TableVersion;


class Section1Parser {
    public static function parse(string $data): IdentificationSection {
        $byteArray = unpack("n1b/n1c/C1d/C1e/C1f/n1g/C1h/C1i/C1j/C1k/C1l/C1m/C1n", $data);

        return new IdentificationSection(
            new Origin($byteArray["b"], $byteArray["c"]),
            new TableVersion($byteArray["d"], $byteArray["e"]),
            ReferenceTimeParser::parse(
                $byteArray["f"],
                $byteArray["g"],
                $byteArray["h"],
                $byteArray["i"],
                $byteArray["j"],
                $byteArray["k"],
                $byteArray["l"]
            ),
            ProductionStatusParser::parse($byteArray["m"]),
            DataTypeParser::parse($byteArray["n"])
        );
    }
}
