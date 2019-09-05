<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section5;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section5\IDataRepresentationTemplate;


class DataRepresentationTemplateParser {
    public static function parse(int $templateNumber, string $templateData): ?IDataRepresentationTemplate {
        switch ($templateNumber) {
            case 0:
                return DataRepresentationTemplate0Parser::parse($templateData);
                break;
            case 65535:
                return NULL;
            default:
                throw new InvalidArgumentException('data representation template with number ' . $templateNumber . ' is not supported');
        }
    }
}
