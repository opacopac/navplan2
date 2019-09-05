<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section1;


class Origin {
    private $center;
    private $subcenter;


    // region GETTER

    public function getCenter(): int {
        return $this->center;
    }


    public function getSubcenter(): int {
        return $this->subcenter;
    }

    // endregion


    public function __construct(
        int $originCenter,
        int $originSubcenter
    ) {
        $this->center = $originCenter;
        $this->subcenter = $originSubcenter;
    }
}
