<?php declare(strict_types=1);

namespace Navplan\Common\DomainModel;


class Frequency {
    public function __construct(
        public float $value,
        public FrequencyUnit $unit,
    ) {
    }
}
