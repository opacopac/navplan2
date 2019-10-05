<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Grib2Parser\Section0;

use InvalidArgumentException;
use Navplan\MeteoGrib2\Domain\Section0\IndicatorSection;


class Section0Parser {
    public const GRIB2_MAGIC = 'GRIB';
    public const GRIB2_EDITION = 2;
    public const LENGTH_BYTES = 16;


    public static function parse(string $data): IndicatorSection {
        $byteArray = unpack("n1b/C1c/C1d/J1e", $data);

        if ($byteArray["d"] !== self::GRIB2_EDITION) {
            throw new InvalidArgumentException('not a GRIB2 file');
        }

        return new IndicatorSection(
            DisciplineParser::parse($byteArray["c"]),
            $byteArray["d"]
        );
    }
}
