<?php declare(strict_types=1);

namespace Navplan\VerticalMap\DomainModel;

use Navplan\Enroute\DomainModel\Airspace;


class VerticalMapAirspace {
    public array $airspaceSteps = [];


    public function __construct(public Airspace $airspace) {
    }
}
