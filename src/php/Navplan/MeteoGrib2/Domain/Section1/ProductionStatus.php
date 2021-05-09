<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section1;

use Navplan\Common\Enum;


class ProductionStatus extends Enum {
    const UNKNOWN = 0;
    const OPERATIONAL_PRODUCTS = 1;
    const OPERATIONAL_TEST_PRODUCTS = 2;
    const RESEARCH_PRODUCTS = 3;
    const REANALYSIS_PRODUCTS = 4;
    const MISSING = 999;

    const __default = self::UNKNOWN;
}
