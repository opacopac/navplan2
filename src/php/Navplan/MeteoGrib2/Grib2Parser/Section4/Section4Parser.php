<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section4;

use Navplan\MeteoGrib2\Domain\Section4\ProductDefinitionSection;


class Section4Parser {
    public static function parse(string $data): ProductDefinitionSection {
        $byteArray = unpack("n1b/n1c/a*d", $data);

        return new ProductDefinitionSection(
            ProductDefinitionTemplateParser::parse($byteArray["c"], $byteArray["d"]),
            [] // TODO
        );
    }
}
