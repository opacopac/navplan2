<?php declare(strict_types=1);

namespace Navplan\Traffic\DomainModel;


class TrafficDetailsReadRequest {
    public function __construct(public array $trafficDetailList) {
    }
}
