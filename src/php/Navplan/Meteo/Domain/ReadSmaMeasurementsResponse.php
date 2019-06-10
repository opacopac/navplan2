<?php declare(strict_types=1);

namespace Navplan\Meteo\Domain;


class ReadSmaMeasurementsResponse {
    public $smaMeasurementList;


    public function __construct(array $smaMeasurementList) {
        $this->smaMeasurementList = $smaMeasurementList;
    }
}
