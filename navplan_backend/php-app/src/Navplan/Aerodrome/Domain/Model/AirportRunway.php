<?php declare(strict_types=1);

namespace Navplan\Aerodrome\Domain\Model;

use Navplan\Common\Domain\Model\Length;


class AirportRunway {
    public function __construct(
        public string $name,
        public AirportRunwayType $surface,
        public ?Length $length,
        public ?Length $width,
        public int $direction,
        public ?Length $tora,
        public ?Length $lda,
        public ?bool $papi,
        public AirportRunwayOperations $operations,
    ) {
    }
}
