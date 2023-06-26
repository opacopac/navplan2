<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;


class Frequency {
    public function __construct(
        public float $value,
        public FrequencyUnit $unit,
    ) {
    }
}
