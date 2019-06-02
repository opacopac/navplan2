<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain;


class ReadSharedFlightrouteRequest {
    public $shareId;


    public function __construct(
        string $shareId
    ) {
        $this->shareId = $shareId;
    }
}
