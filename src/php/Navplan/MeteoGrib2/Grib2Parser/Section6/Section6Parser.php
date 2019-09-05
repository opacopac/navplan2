<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section6;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section6\Section6;
use Navplan\MeteoGrib2\Grib2Parser\Grib2ParserHelper;


class Section6Parser {
    private const SECTION_NUMBER = 6;


    public static function parse($fileHandle): Section6 {
        $byteArray = self::readByteArray($fileHandle);

        return new Section6(
            $byteArray["b"],
            $byteArray["c"]
        );
    }


    private static function readByteArray($fileHandle): array {
        $length = Grib2ParserHelper::parseSectionLength($fileHandle);
        $data = fread($fileHandle, $length - 4);
        $byteArray = unpack("C1a/C1b/a*c", $data);

        if (!$byteArray["a"] || $byteArray["a"] !== self::SECTION_NUMBER) {
            throw new InvalidArgumentException('invalid section number');
        }

        return $byteArray;
    }
}
