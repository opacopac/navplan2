<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section1;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section1\Section1;
use Navplan\MeteoGrib2\Grib2Parser\Grib2ParserHelper;


class Section1Parser {
    private const SECTION_NUMBER = 1;


    public static function parse($fileHandle): Section1 {
        $byteArray = self::readByteArray($fileHandle);

        return new Section1(
            $byteArray["b"],
            $byteArray["c"],
            $byteArray["d"],
            $byteArray["e"],
            ReferenceTimeSignificanceParser::parse($byteArray["f"]),
            ReferenceTimeParser::parse(
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


    private static function readByteArray($fileHandle): array {
        $length = Grib2ParserHelper::parseSectionLength($fileHandle);
        $data = fread($fileHandle, $length - 4);
        $byteArray = unpack("C1a/n1b/n1c/C1d/C1e/C1f/n1g/C1h/C1i/C1j/C1k/C1l/C1m/C1n", $data);

        if (!$byteArray["a"] || $byteArray["a"] !== self::SECTION_NUMBER) {
            throw new InvalidArgumentException('invalid section number');
        }

        return $byteArray;
    }
}
