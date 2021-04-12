<?php declare(strict_types=1);

namespace Navplan\MeteoSma\UseCase\ReadSmaMeasurements;


class ReadSmaMeasurementsResponse {
    public function __construct(public array $smaMeasurementList) {
    }
}
