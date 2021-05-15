<?php declare(strict_types=1);

namespace Navplan\Aerodrome\DomainModel;

use Navplan\Common\DomainModel\Length;


class AirportRunway {
    public function __construct(
        public string $name,
        public string $surface,
        public ?Length $length,
        public ?Length $width,
        public int $direction1,
        public int $direction2,
        public ?Length $tora1,
        public ?Length $tora2,
        public ?Length $lda1,
        public ?Length $lda2,
        public ?bool $papi1,
        public ?bool $papi2
    ) {
    }
}
