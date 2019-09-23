<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section7;

use Navplan\MeteoGrib2\Domain\Section5\IDataRepresentationTemplate;
use Navplan\MeteoGrib2\Domain\Section7\Section7;


class Section7Parser {
    public static function parse(string $data, IDataRepresentationTemplate $template): Section7 {
        return new Section7(PackedValuesParser::parse($template, $data));
    }
}
