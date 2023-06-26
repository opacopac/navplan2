<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain\Model;


class TrafficOgn {
    public function __construct(
        public TrafficAddress $address,
        public int $acType,
        public array $positionList
    ) {
    }
}
