<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionTemplate20;


class GridDefinitionTemplate20Parser {
    public static function parse(string $data): GridDefinitionTemplate20 {
        $earthShape = EarthShapeParser::parse($data);
        $byteArray = unpack("N1h/N1i/N1l/N1m/C1n/N1o/N1p/N1q/N1r/C1s/C1t", $data, EarthShapeParser::LENGTH_BYTES);

        return new GridDefinitionTemplate20(
            $earthShape,
            $byteArray["h"],
            $byteArray["i"],
            LatLonParser::parse($byteArray["l"], $byteArray["m"]),
            ResolutionAndComponentFlagsParser::parse($byteArray["n"]),
            LatLonParser::parse($byteArray["o"], $byteArray["p"]),
            $byteArray["q"],
            $byteArray["r"],
            ProjectionCenterParser::parse($byteArray["s"]),
            ScanningModeParser::parse($byteArray["t"])
        );
    }
}

