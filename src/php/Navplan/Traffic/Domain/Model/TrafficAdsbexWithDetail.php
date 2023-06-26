<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain\Model;


class TrafficAdsbexWithDetail {
    public function __construct(
        public TrafficAdsbex $adsbTraffic,
        public ?string $acClass,
        public ?string $engClass
    ) {
    }
}
