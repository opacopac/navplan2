<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Domain\Service;

use Navplan\Common\Domain\Model\Length;
use Navplan\MeteoGram\Domain\Model\CloudMeteogramStep;


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
