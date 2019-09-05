<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section3;


class NumberOfPoints {
    private $octetCount;
    private $interpretation;
    private $values;


    // region GETTER

    public function getOctetCount(): int {
        return $this->octetCount;
    }


    public function getInterpretation(): NumberOfPointsInterpretation {
        return $this->interpretation;
    }


    public function getValues(): array {
        return $this->values;
    }

    // endregion


    public function __construct(
        int $octetCount,
        NumberOfPointsInterpretation $interpretation,
        array $values
    ) {
        $this->octetCount = $octetCount;
        $this->interpretation = $interpretation;
        $this->values = $values;
    }
}
