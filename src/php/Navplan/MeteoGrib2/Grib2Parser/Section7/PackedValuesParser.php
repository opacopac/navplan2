<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section7;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section5\IDataRepresentationTemplate;


class PackedValuesParser {
    public static function parse(IDataRepresentationTemplate $template, string $data, int $valueCount, ?array $bitMap): array {
        switch ($template->getTemplateNumber()) {
            case 0: return SimplePackingParser::parse($template, $data, $valueCount, $bitMap);
            default: throw new InvalidArgumentException('data representation template nr ' . $template->getTemplateNumber() . ' is not supported!');
        }
    }
}
