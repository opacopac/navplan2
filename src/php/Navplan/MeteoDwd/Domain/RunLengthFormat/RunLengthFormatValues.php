<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\RunLengthFormat;


class RunLengthFormatValues {
    private $minValue;
    private $maxValue;
    private $valueList;


    // region GETTER

    public function getMinValue(): int {
        return $this->minValue;
    }


    public function getMaxValue(): int {
        return $this->maxValue;
    }


    public function getValueList(): array {
        return $this->valueList;
    }

    // endregion


    public function __construct(
        int $minValue,
        int $maxValue,
        array $valueList
    ) {
        $this->minValue = $minValue;
        $this->maxValue = $maxValue;
        $this->valueList = $valueList;
    }
}
