<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section6;

use Navplan\MeteoGrib2\Domain\Section6\BitmapSection;


class Section6Parser {
    public static function parse(string $data): BitmapSection {
        $byteArray = unpack("C1b", $data);
        $bitMapValues = array_values(unpack("C*c", $data, 1));

        return new BitmapSection(
            $byteArray["b"],
            ($bitMapValues && count($bitMapValues) > 0) ? $bitMapValues : NULL
        );
    }
}
