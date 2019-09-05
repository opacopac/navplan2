<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section8;

use InvalidArgumentException;


class Section8Parser {
    private const GRIB2_FINAL_MAGIC = '7777';
    private const LENGTH_BYTES = 4;


    public static function parse($fileHandle): void {
        self::readByteArray($fileHandle);
    }


    private static function readByteArray($fileHandle): void {
        $data = fread($fileHandle, self::LENGTH_BYTES);
        $byteArray = unpack("a4a", $data);

        if (!$byteArray["a"] || $byteArray["a"] !== self::GRIB2_FINAL_MAGIC) {
            throw new InvalidArgumentException('invalid data in end section');
        }
    }
}
