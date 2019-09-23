<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section4;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section4\IProductDefinitionTemplate;


class ProductDefinitionTemplateParser {
    public static function parse(int $templateNumber, string $templateData): ?IProductDefinitionTemplate {
        switch ($templateNumber) {
            case 0:
                return ProductDefinitionTemplate0Parser::parse($templateData);
                break;
            case 8:
                return ProductDefinitionTemplate8Parser::parse($templateData);
                break;
            case 65535:
                return NULL;
            default:
                throw new InvalidArgumentException('product definition template with number ' . $templateNumber . ' is not supported');
        }
    }
}
