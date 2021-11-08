<?php declare(strict_types=1);

namespace Navplan\VerticalMap\UseCase\ReadVerticalMap;

use Navplan\VerticalMap\DomainModel\VerticalMap;


class ReadVerticalMapResponse {
    public function __construct(
        public VerticalMap $verticalMap
    ) {
    }
}
