<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section7;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section5\IDataRepresentationTemplate;
use Navplan\MeteoGrib2\Domain\Section7\Section7;
use Navplan\MeteoGrib2\Grib2Parser\Grib2ParserHelper;


class Section7Parser {
    private const SECTION_NUMBER = 7;


    public static function parse($fileHandle, IDataRepresentationTemplate $template): Section7 {
        $byteArray = self::readByteArray($fileHandle);

        return new Section7(
            DataValuesParser::parse($template, $byteArray["b"])
        );
    }


    private static function readByteArray($fileHandle): array {
        $length = Grib2ParserHelper::parseSectionLength($fileHandle);
        $data = fread($fileHandle, $length - 4);
        $byteArray = unpack("C1a/a*b", $data);

        if (!$byteArray["a"] || $byteArray["a"] !== self::SECTION_NUMBER) {
            throw new InvalidArgumentException('invalid section number');
        }

        return $byteArray;
    }
}
