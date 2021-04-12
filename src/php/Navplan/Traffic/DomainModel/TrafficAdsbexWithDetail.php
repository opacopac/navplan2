<?php declare(strict_types=1);

namespace Navplan\Traffic\DomainModel;


class TrafficAdsbexWithDetail {
    public function __construct(
        public TrafficAdsbex $adsbTraffic,
        public ?string $acClass,
        public ?string $engClass
    ) {
    }
}
