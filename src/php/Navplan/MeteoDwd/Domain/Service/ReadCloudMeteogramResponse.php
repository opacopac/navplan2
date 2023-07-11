<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Service;

use Navplan\Common\Domain\Model\Length;
use Navplan\MeteoDwd\Domain\Model\CloudMeteogramStep;


class ReadCloudMeteogramResponse {
    /**
     * @param Length $heightAmsl
     * @param CloudMeteogramStep[] $cloudMeteogramSteps
     */
    public function __construct(
        public Length $heightAmsl,
        public array $cloudMeteogramSteps,
    ) {
    }
}
