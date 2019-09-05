<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section3\IGridDefinitionTemplate;


class GridDefinitionTemplateParser {
    public static function parse(int $templateNumber, string $templateData): IGridDefinitionTemplate {
        switch ($templateNumber) {
            case 0:
                return GridDefinitionTemplate0Parser::parse($templateData);
                break;
            case 20:
                return GridDefinitionTemplate20Parser::parse($templateData);
                break;
            default:
                throw new InvalidArgumentException('grid definition template with number ' . $templateNumber . ' is not supported');
        }
    }
}
