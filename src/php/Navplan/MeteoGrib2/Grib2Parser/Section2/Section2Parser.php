<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section2;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section2\Section2;
use Navplan\MeteoGrib2\Grib2Parser\Grib2ParserHelper;


class Section2Parser {
    private const SECTION_NUMBER = 2;


    public static function parse($fileHandle): Section2 {
        $byteArray = self::readByteArray($fileHandle);

        return new Section2();
    }


    private static function readByteArray($fileHandle): array {
        $length = Grib2ParserHelper::parseSectionLength($fileHandle);
        $data = fread($fileHandle, $length - 4);
        $byteArray = unpack("C1a", $data);

        if (!$byteArray["a"] || $byteArray["a"] !== self::SECTION_NUMBER) {
            throw new InvalidArgumentException('invalid section number');
        }

        return $byteArray;
    }
}
