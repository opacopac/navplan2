<?php declare(strict_types=1);

namespace Navplan\VerticalMap\Domain\Service\RestModel;

use Navplan\VerticalMap\Domain\Model\VerticalMap;


class ReadVerticalMapResponse {
    public function __construct(
        public VerticalMap $verticalMap
    ) {
    }


    public function toRest(): array {
        return array(
            'verticalMap' => VerticalMapConverter::toRest($this->verticalMap)
        );
    }
}
