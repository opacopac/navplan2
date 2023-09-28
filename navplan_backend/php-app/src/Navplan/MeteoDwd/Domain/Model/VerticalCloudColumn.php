<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Model;

use Navplan\Common\Domain\Model\Length;


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
