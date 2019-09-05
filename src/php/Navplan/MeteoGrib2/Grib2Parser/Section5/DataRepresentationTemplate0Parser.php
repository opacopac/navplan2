<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section5;

use Navplan\MeteoGrib2\Domain\Section5\DataRepresentationTemplate0;
use Navplan\MeteoGrib2\Grib2Parser\FloatParser;
use Navplan\MeteoGrib2\Grib2Parser\SignedIntParser;


class DataRepresentationTemplate0Parser {
    public static function parse(string $data): DataRepresentationTemplate0 {
        $byteArray = unpack("N1a/n1b/n1c/C1d/C1e", $data);

        return new DataRepresentationTemplate0(
            FloatParser::parse($byteArray["a"]),
            SignedIntParser::parse($byteArray["b"]),
            SignedIntParser::parse($byteArray["c"]),
            $byteArray["d"],
            FieldTypeParser::parse($byteArray["e"])
        );
    }
}
