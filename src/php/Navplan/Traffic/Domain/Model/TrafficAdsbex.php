<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain\Model;


class TrafficAdsbex {
    public function __construct(
        public TrafficAddress $address,
        public ?string $icaoType,
        public ?string $registration,
        public ?string $callsign,
        public ?string $opIcao,
        public array $positionList
    ) {
    }
}
