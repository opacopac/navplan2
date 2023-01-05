<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;


use Navplan\Common\DomainModel\Position2d;

class VerticalCloudColumn {
    public function __construct(
        public Position2d $position,
        /**
         * @var VerticalCloudLevel[]
         */
        public array $cloudLevels
    ) {
    }
}
