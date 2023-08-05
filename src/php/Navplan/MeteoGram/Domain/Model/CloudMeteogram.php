<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Domain\Model;

use Navplan\Common\Domain\Model\Length;


class CloudMeteogram {
    /**
     * @param Length $heightAmsl
     * @param CloudMeteogramStep[] $cloudMeteogramSteps
     */
    public function __construct(
        public Length $heightAmsl,
        public array $cloudMeteogramSteps
    ) {
    }
}
