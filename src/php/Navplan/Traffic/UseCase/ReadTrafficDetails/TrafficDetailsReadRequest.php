<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase\ReadTrafficDetails;


class TrafficDetailsReadRequest {
    public function __construct(public array $trafficDetailList) {
    }
}
