<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section7;

use Navplan\MeteoGrib2\Domain\Section5\DataRepresentationTemplate0;
use Navplan\MeteoGrib2\Grib2Parser\ValueUnpacker;


class SimplePackingParser {
    private const OUTSIDE_BITMAP_VALUE = 0;


    public static function parse(DataRepresentationTemplate0 $template, string $data, int $valueCount, ?array $bitMap): array {
        if ($data === "") {
            return [];
        }

        $bitCount = $template->getBitsUsed();
        $values = BinaryParser::parse($bitCount, $data);

        $valueUnpacker = new ValueUnpacker(
            $template->getReferenceValue(),
            $template->getBinaryScaleFactor(),
            $template->getDecimalScaleFactor(),
            $template->getFieldType()
        );

        if ($bitMap === NULL) {
            return self::unpackValues($values, $valueUnpacker);
        } else {
            return self::expandAndUnpackValues($values, $valueUnpacker, $bitMap, $valueCount);
        }

    }


    private static function unpackValues(array $values, ValueUnpacker $valueUnpacker): array {
        return array_map(
            function($packedValue) use ($valueUnpacker) {
                return $valueUnpacker->unpack($packedValue);
            },
            $values
        );
    }


    private static function expandAndUnpackValues(array $values, ValueUnpacker $valueUnpacker, array $bitMap, int $valueCount): array {
        $i = 0;
        $expandedValues = [];
        foreach ($bitMap as $bitMapByte) {
            for ($j = 0; $j < 8; $j++) {
                if (count($expandedValues) >= $valueCount) {
                    break;
                }

                if ($bitMapByte & 1 << $j) {
                    $expandedValues[] = $valueUnpacker->unpack($values[$i]);
                    $i++;
                } else {
                    $expandedValues[] = self::OUTSIDE_BITMAP_VALUE;
                }
            }
        }

        return $expandedValues;
    }
}
