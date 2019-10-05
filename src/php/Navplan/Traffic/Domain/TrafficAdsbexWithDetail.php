<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain;


class TrafficAdsbexWithDetail {
    public $adsbTraffic;
    public $acClass;
    public $engClass;


    public function __construct(
        TrafficAdsbex $adsbTraffic,
        ?string $acClass,
        ?string $engClass
    ) {
        $this->adsbTraffic = $adsbTraffic;
        $this->acClass = $acClass;
        $this->engClass = $engClass;
    }
}
