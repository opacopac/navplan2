<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Service;

use Navplan\Common\Domain\Model\Position2d;


class ReadCloudMeteogramRequest {
    public function __construct(
        public string $fcName,
        public int $minStep,
        public int $maxStep,
        public Position2d $pos
    ) {
    }
}
