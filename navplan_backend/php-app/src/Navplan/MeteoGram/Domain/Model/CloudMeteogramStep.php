<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Domain\Model;

use Navplan\Common\Domain\Model\Precipitation;
use Navplan\Common\Domain\Model\Temperature;
use Navplan\MeteoDwd\Domain\Model\VerticalCloudLevel;


class CloudMeteogramStep {
    public function __construct(
        public int $forecastStep,
        /**
         * @var VerticalCloudLevel[]
         */
        public array $cloudLevels,
        public Precipitation $precip,
        public ?Temperature $temp
    ) {
    }
}
