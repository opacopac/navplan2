<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section7;

use InvalidArgumentException;


class BinaryParser {
    public static function parse(int $bitCount, string $data) {
        if ($bitCount <= 0 || $bitCount >= 64) {
            throw new InvalidArgumentException('invalid bitCount ' . $bitCount . '. min 1, max 63 bits allowed');
        }

        if ($bitCount === 8 || $bitCount === 16 || $bitCount == 32) {
            return self::readValues($bitCount, $data);
        } else {
            return self::readValuesForOddBitCount($bitCount, $data);
        }
    }


    private static function readValues(int $bitCount, string $data): array {
        $packFormat = self::getEvenPackFormat($bitCount);
        $byteArray = unpack($packFormat, $data);

        return array_values($byteArray);
    }


    private static function getEvenPackFormat(int $bitCount): string {
        switch ($bitCount) {
            case 8: return "C*a";
            case 16: return "n*a";
            case 32: return "N*a";
            default: throw new InvalidArgumentException('invalid even bitCount ' . $bitCount);
        }
    }


    private static function readValuesForOddBitCount(int $bitCount, string $data): array {
        $byteArray = unpack("C*a", $data);
        $byteValues = array_values($byteArray);

        $values = [];
        $windowValue = 0;
        $windowBitCount = 0;
        $windowBitOffset = 0;

        foreach ($byteValues as $nextByte) {
            $windowValue = self::addNextByteToWindow($windowValue, $nextByte);
            $windowBitCount += 8;

            while ($windowBitCount - $windowBitOffset >= $bitCount) {
                $values[] = self::getValueFromWindow($windowValue, $windowBitCount, $windowBitOffset, $bitCount);
                $windowBitOffset+= $bitCount;
            }

            while ($windowBitOffset >= 8) {
                $windowValue = self::cropOldestByteFromWindow($windowValue, $windowBitCount);
                $windowBitCount -= 8;
                $windowBitOffset -= 8;
            }
        }

        return $values;
    }


    private static function addNextByteToWindow(int $windowValue, int $nextByte): int {
        return ($windowValue << 8) | $nextByte;
    }


    private static function getValueFromWindow(int $windowValue, int $windowBitCount, int $windowBitOffset, int $bitCount): int {
        $value = $windowValue >> ($windowBitCount - $bitCount - $windowBitOffset);
        $mask = ~(~0 << $bitCount);

        return $value & $mask;
    }


    private static function cropOldestByteFromWindow(int $windowValue, int $windowBitCount): int {
        $mask = ~(~0 << ($windowBitCount - 8));

        return $windowValue & $mask;
    }
}
