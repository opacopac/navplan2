<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain;


class TrafficAddress {
    public $value;
    public $type;


    public function __construct(
        string $value,
        int $type
    ) {
        $this->value = $value;
        $this->type = $type;
    }
}
