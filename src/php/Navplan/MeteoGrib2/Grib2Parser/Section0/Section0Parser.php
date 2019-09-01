<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section0;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section0\Section0;


class Section0Parser {
    private const GRIB2_MAGIC = 'GRIB';
    private const GRIB2_EDITION = 2;
    private const LENGTH_BYTES = 16;


    public static function parse($fileHandle): Section0 {
        $byteArray = self::readByteArray($fileHandle);

        return new Section0(
            DisciplineParser::parse($byteArray["c"]),
            $byteArray["d"]
        );
    }


    private static function readByteArray($fileHandle): array {
        $data = fread($fileHandle, self::LENGTH_BYTES);
        $byteArray = unpack("a4a/n1b/C1c/C1d/J1e", $data);

        if (!$byteArray["a"] || $byteArray["a"] !== self::GRIB2_MAGIC
            || !$byteArray["d"] || $byteArray["d"] !== self::GRIB2_EDITION) {
            throw new InvalidArgumentException('not a GRIB2 file');
        }

        return $byteArray;
    }
}
