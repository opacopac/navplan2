<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section7;

use Navplan\MeteoGrib2\Domain\Section5\DataRepresentationTemplate0;
use Navplan\MeteoGrib2\Grib2Parser\PackedValue;


class SimplePackingParser {
    public static function parse(DataRepresentationTemplate0 $template, string $data): array {
        $bp = new BitwiseParser($data);
        $bitSize = $template->getBitsUsed();
        $valueList = [];

        do {
            $packedValue = $bp->readValue($bitSize);
            if ($packedValue !== NULL) {
                $valueList[] = PackedValue::unpack(
                    $template->getReferenceValue(),
                    $packedValue,
                    $template->getBinaryScaleFactor(),
                    $template->getDecimalScaleFactor(),
                    $template->getFieldType()
                );
            }
        } while ($packedValue !== NULL);

        return $valueList;
    }
}
