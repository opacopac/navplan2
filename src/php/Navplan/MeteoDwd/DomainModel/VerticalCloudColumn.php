<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;

use Navplan\Common\DomainModel\Length;


class VerticalCloudColumn {
    public function __construct(
        public Length $horDist,
        /**
         * @var VerticalCloudLevel[]
         */
        public array $cloudLevels
    ) {
    }
}
