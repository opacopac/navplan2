<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section5;

use Navplan\Common\Enum;


class FieldType extends Enum {
    const UNKNOWN = 0;
    public const FLOAT = 1;
    public const INTEGER = 2;
    public const MISSING = 999;


    public const __default = self::UNKNOWN;
}
