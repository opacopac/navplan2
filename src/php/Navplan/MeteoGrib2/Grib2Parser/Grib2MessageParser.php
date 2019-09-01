<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser;

use Navplan\MeteoGrib2\Domain\Grib2Message;
use Navplan\MeteoGrib2\Grib2Parser\Section0\Section0Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section1\Section1Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section2\Section2Parser;


class Grib2MessageParser {
    public static function parse($fileHandle): Grib2Message {
        return new Grib2Message(
            Section0Parser::parse($fileHandle),
            Section1Parser::parse($fileHandle),
            Section2Parser::parse($fileHandle)
        );
    }
}
