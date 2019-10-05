<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section7;

use Navplan\MeteoGrib2\Domain\Section5\IDataRepresentationTemplate;
use Navplan\MeteoGrib2\Domain\Section7\DataSection;


class Section7Parser {
    public static function parse(IDataRepresentationTemplate $template, string $data, int $valueCount, ?array $bitMap): DataSection {
        return new DataSection(PackedValuesParser::parse($template, $data, $valueCount, $bitMap));
    }
}
