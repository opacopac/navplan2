<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Model;

use Navplan\Common\Domain\Model\Length;


class VerticalWindColumn {
    public function __construct(
        public Length $horDist,
        /**
         * @var VerticalWindLevel[]
         */
        public array $windLevels
    ) {
    }
}
