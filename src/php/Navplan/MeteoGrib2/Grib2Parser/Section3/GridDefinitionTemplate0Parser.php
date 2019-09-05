<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionTemplate0;


class GridDefinitionTemplate0Parser {
    public static function parse(string $data): GridDefinitionTemplate0 {
        $earthShape = EarthShapeParser::parse($data);
        $byteArray = unpack("N1h/N1i/N1j/N1k/N1l/N1m/C1n/N1o/N1p/N1q/N1r/C1s", $data, EarthShapeParser::LENGTH_BYTES);

        return new GridDefinitionTemplate0(
            $earthShape,
            $byteArray["h"],
            $byteArray["i"],
            $byteArray["j"],
            $byteArray["k"],
            LatLonParser::parse($byteArray["l"], $byteArray["m"]),
            ResolutionAndComponentFlagsParser::parse($byteArray["n"]),
            LatLonParser::parse($byteArray["o"], $byteArray["p"]),
            $byteArray["q"],
            $byteArray["r"],
            ScanningModeParser::parse($byteArray["s"])
        );
    }
}
