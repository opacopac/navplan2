<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section1;

use DateTime;


class ReferenceTime {
    private $significance;
    private $value;


    // region GETTER

    public function getSignificance(): ReferenceTimeSignificance {
        return $this->significance;
    }


    public function getValue(): DateTime {
        return $this->value;
    }


    // endregion


    public function __construct(
        ReferenceTimeSignificance $significance,
        DateTime $value
    ) {
        $this->significance = $significance;
        $this->value = $value;
    }
}
