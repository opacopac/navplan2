<?php declare(strict_types=1);

namespace Navplan\Traffic\DomainModel;


class TrafficAddress {
    public function __construct(
        public string $value,
        public int $type
    ) {
        $this->value = strtoupper(trim($value));
    }
}
