<?php declare(strict_types=1);

namespace Navplan\MeteoGrib2\Domain\Section4;

use DateInterval;


class TimeRangeSpecification {
    private $statisticalProcessingType;
    private $timeIncrementType;
    private $statisticalProcessingInterval;
    private $betweenSuccessiveFieldsInterval;


    // region GETTER

    public function getStatisticalProcessingType(): int {
        return $this->statisticalProcessingType;
    }


    public function getTimeIncrementType(): int {
        return $this->timeIncrementType;
    }


    public function getStatisticalProcessingInterval(): DateInterval {
        return $this->statisticalProcessingInterval;
    }


    public function getBetweenSuccessiveFieldsInterval(): DateInterval {
        return $this->betweenSuccessiveFieldsInterval;
    }

    // endregion


    public function __construct(
        int $statisticalProcessingType,
        int $timeIncrementType,
        DateInterval $statisticalProcessingInterval,
        DateInterval $betweenSuccessiveFieldsInterval
    ) {
        $this->statisticalProcessingType = $statisticalProcessingType;
        $this->timeIncrementType = $timeIncrementType;
        $this->statisticalProcessingInterval = $statisticalProcessingInterval;
        $this->betweenSuccessiveFieldsInterval = $betweenSuccessiveFieldsInterval;
    }
}
