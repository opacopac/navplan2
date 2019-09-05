<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser;

use Navplan\MeteoGrib2\Domain\Grib2Message;
use Navplan\MeteoGrib2\Domain\Section2\Section2;
use Navplan\MeteoGrib2\Grib2Parser\Section0\Section0Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section1\Section1Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section2\Section2Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section3\Section3Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section4\Section4Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section5\Section5Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section6\Section6Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section7\Section7Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section8\Section8Parser;


class Grib2MessageParser {
    public static function parse($fileHandle): Grib2Message {
        $section0 = Section0Parser::parse($fileHandle);
        $section1 = Section1Parser::parse($fileHandle);
        $section2 = new Section2(); // Section2Parser::parse($fileHandle);
        $section3 = Section3Parser::parse($fileHandle);
        $section4 = Section4Parser::parse($fileHandle);
        $section5 = Section5Parser::parse($fileHandle);
        $section6 = Section6Parser::parse($fileHandle);
        $section7 = Section7Parser::parse($fileHandle, $section5->getDataRepresentationTemplate());
        Section8Parser::parse($fileHandle);

        return new Grib2Message(
            $section0,
            $section1,
            $section2,
            $section3,
            $section4,
            $section5,
            $section6,
            $section7
        );
    }
}
