<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section8;

use Navplan\MeteoGrib2\Domain\Section8\Section8;


class Section8Parser {
    public const GRIB2_FINAL_MAGIC = '7777';
    public const LENGTH_BYTES = 4;


    public static function parse(): Section8 {
        return new Section8();
    }
}
