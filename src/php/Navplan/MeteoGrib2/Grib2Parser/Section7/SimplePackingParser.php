<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section7;

use Navplan\MeteoGrib2\Domain\Section5\DataRepresentationTemplate0;
use Navplan\MeteoGrib2\Grib2Parser\ValueUnpacker;


class SimplePackingParser {
    public static function parse(DataRepresentationTemplate0 $template, string $data): array {
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

        return array_map(
            function($packedValue) use ($valueUnpacker) {
                return $valueUnpacker->unpack($packedValue);
            },
            $values
        );
    }
}
