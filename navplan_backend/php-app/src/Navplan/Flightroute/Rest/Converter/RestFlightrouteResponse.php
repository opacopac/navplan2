<?php declare(strict_types=1);

namespace Navplan\Flightroute\Rest\Converter;

use Navplan\Flightroute\Domain\Model\Flightroute;


class RestFlightrouteResponse {
    public function __construct(public ?Flightroute $flightroute) {
    }


    public function toRest(): array  {
        return array(
            "navplan" => $this->flightroute ? RestFlightrouteConverter::toRest($this->flightroute) : NULL
        );
    }
}
