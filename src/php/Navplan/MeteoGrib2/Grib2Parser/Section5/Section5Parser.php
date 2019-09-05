<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section5;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section5\Section5;
use Navplan\MeteoGrib2\Grib2Parser\Grib2ParserHelper;


class Section5Parser {
    private const SECTION_NUMBER = 5;


    public static function parse($fileHandle): Section5 {
        $byteArray = self::readByteArray($fileHandle);

        return new Section5(
            $byteArray["b"],
            DataRepresentationTemplateParser::parse($byteArray["c"], $byteArray["d"])
        );
    }


    private static function readByteArray($fileHandle): array {
        $length = Grib2ParserHelper::parseSectionLength($fileHandle);
        $data = fread($fileHandle, $length - 4);
        $byteArray = unpack("C1a/N1b/n1c/a*d", $data);

        if (!$byteArray["a"] || $byteArray["a"] !== self::SECTION_NUMBER) {
            throw new InvalidArgumentException('invalid section number');
        }

        return $byteArray;
    }
}
