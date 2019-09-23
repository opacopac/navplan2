<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section4;

use Navplan\MeteoGrib2\Domain\Section4\Section4;


class Section4Parser {
    public static function parse(string $data): Section4 {
        $byteArray = unpack("n1b/n1c/a*d", $data);

        return new Section4(
            ProductDefinitionTemplateParser::parse($byteArray["c"], $byteArray["d"]),
            [] // TODO
        );
    }
}
