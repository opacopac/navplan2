<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section4;


class FixedSurface {
    private $type;
    private $value;


    // region GETTER

    public function getType(): int {
        return $this->type;
    }


    public function getValue(): float {
        return $this->value;
    }

    // endregion


    public function __construct(
        int $type,
        float $value
    ) {
        $this->type = $type;
        $this->value = $value;
    }
}
