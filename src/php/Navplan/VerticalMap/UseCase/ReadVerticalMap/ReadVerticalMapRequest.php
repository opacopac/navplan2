<?php declare(strict_types=1);

namespace Navplan\VerticalMap\UseCase\ReadVerticalMap;

use Navplan\Common\DomainModel\Position2d;


class ReadVerticalMapRequest {
    /**
     * @param Position2d[] $wpPositions
     */
    public function __construct(public array $wpPositions) {
    }
}
