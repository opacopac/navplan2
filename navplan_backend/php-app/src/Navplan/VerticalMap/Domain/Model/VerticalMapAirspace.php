<?php declare(strict_types=1);

namespace Navplan\VerticalMap\Domain\Model;

use Navplan\Airspace\Domain\Model\Airspace;


class VerticalMapAirspace {
    public array $airspaceSteps = [];


    public function __construct(public Airspace $airspace) {
    }
}
