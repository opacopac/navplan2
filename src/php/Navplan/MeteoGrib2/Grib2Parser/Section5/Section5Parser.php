<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section5;

use Navplan\MeteoGrib2\Domain\Section5\DataRepresentationSection;


class Section5Parser {
    public static function parse(string $data): DataRepresentationSection {
        $byteArray = unpack("N1b/n1c/a*d", $data);

        return new DataRepresentationSection(
            $byteArray["b"],
            DataRepresentationTemplateParser::parse($byteArray["c"], $byteArray["d"])
        );
    }
}
