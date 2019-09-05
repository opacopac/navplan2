<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section4;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section4\Section4;
use Navplan\MeteoGrib2\Grib2Parser\Grib2ParserHelper;


class Section4Parser {
    private const SECTION_NUMBER = 4;


    public static function parse($fileHandle): Section4 {
        $byteArray = self::readByteArray($fileHandle);

        return new Section4(
            ProductDefinitionTemplateParser::parse($byteArray["c"], $byteArray["d"]),
            [] // TODO
        );
    }


    private static function readByteArray($fileHandle): array {
        $length = Grib2ParserHelper::parseSectionLength($fileHandle);
        $data = fread($fileHandle, $length - 4);
        $byteArray = unpack("C1a/n1b/n1c/a*d", $data);

        if (!$byteArray["a"] || $byteArray["a"] !== self::SECTION_NUMBER) {
            throw new InvalidArgumentException('invalid section number');
        }

        return $byteArray;
    }
}
