<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section6;

use Navplan\MeteoGrib2\Domain\Section6\Section6;


class Section6Parser {
    public static function parse(string $data): Section6 {
        $byteArray = unpack("C1b/a*c", $data);

        return new Section6(
            $byteArray["b"],
            $byteArray["c"]
        );
    }
}
