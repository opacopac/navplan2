<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section2;

use Navplan\MeteoGrib2\Domain\Section2\Section2;


class Section2Parser {
    public static function parse(string $data): Section2 {
        return new Section2($data);
    }
}
