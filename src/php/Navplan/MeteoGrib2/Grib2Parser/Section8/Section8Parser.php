<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section8;

use Navplan\MeteoGrib2\Domain\Section8\EndSection;


class Section8Parser {
    public const GRIB2_FINAL_MAGIC = '7777';
    public const LENGTH_BYTES = 4;


    public static function parse(): EndSection {
        return new EndSection();
    }
}
