<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DomainModel;


class AirportRadio {
    public function __construct(
        public string $category,
        public string $frequency,
        public string $type,
        public ?string $typespec,
        public string $description
    ) {
    }
}
