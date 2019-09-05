<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section4;


class Parameter {
    private $category;
    private $number;


    // region GETTER

    public function getCategory() {
        return $this->category;
    }


    public function getNumber() {
        return $this->number;
    }

    // endregion


    public function __construct(
        int $category,
        int $number
    ) {
        $this->category = $category;
        $this->number = $number;
    }
}
