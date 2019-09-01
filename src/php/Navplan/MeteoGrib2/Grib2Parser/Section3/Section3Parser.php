<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section3\Section3;
use Navplan\MeteoGrib2\Grib2Parser\Grib2ParserHelper;


class Section3Parser {
    private const SECTION_NUMBER = 3;


    public static function parse($fileHandle): Section3 {
        $byteArray = self::readByteArray($fileHandle);

        return new Section3(
            GridDefinitionSourceParser::parse($byteArray["b"]),
            $byteArray["c"],
            $byteArray["d"],
            NumberOfPointsInterpretationParser::parse($byteArray["e"]),
            GridDefinitionTemplateParser::parse($byteArray["f"], $byteArray["g"])
        );
    }


    private static function readByteArray($fileHandle): array {
        $length = Grib2ParserHelper::parseSectionLength($fileHandle);
        $data = fread($fileHandle, $length - 4);
        $byteArray = unpack("C1a/C1b/N1c/C1d/C1e/n1f/a*g", $data);

        if (!$byteArray["a"] || $byteArray["a"] !== self::SECTION_NUMBER) {
            throw new InvalidArgumentException('invalid section number');
        }

        return $byteArray;
    }
}
