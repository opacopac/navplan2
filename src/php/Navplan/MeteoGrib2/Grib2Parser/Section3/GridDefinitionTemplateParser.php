<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section3;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section3\GridDefinitionTemplateType;
use Navplan\MeteoGrib2\Domain\Section3\IGridDefinitionTemplate;


class GridDefinitionTemplateParser {
    public static function parse(int $typeValue, string $templateData): IGridDefinitionTemplate {
        $type = GridDefinitionTemplateTypeParser::parse($typeValue);

        switch ($type) {
            case GridDefinitionTemplateType::LAT_LON:
                return GridDefinitionTemplateLatLonParser::parse($templateData);
                break;
            case GridDefinitionTemplateType::POLAR_STEREOGRAPHIC:
                return GridDefinitionTemplatePolarStereographicParser::parse($templateData);
                break;
            default:
                throw new InvalidArgumentException('grid definition template of type ' . (int) $type . ' is not supported');
        }
    }
}
