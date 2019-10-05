<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section2;

use Navplan\MeteoGrib2\Domain\Section2\LocalUseSection;


class Section2Parser {
    public static function parse(string $data): LocalUseSection {
        return new LocalUseSection($data);
    }
}
