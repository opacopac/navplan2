<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain;


class TrafficDetailsReadRequest {
    public $trafficDetailList;


    public function __construct(array $trafficDetailsList) {
        $this->trafficDetailList = $trafficDetailsList;
    }
}
