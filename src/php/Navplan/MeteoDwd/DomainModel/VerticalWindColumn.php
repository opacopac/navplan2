<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;

use Navplan\Common\DomainModel\Length;


class VerticalWindColumn {
    public function __construct(
        public Length $horDist,
        /**
         * @var VerticalWindLevel[]
         */
        public array $windLevels≤
    ) {
    }
}
