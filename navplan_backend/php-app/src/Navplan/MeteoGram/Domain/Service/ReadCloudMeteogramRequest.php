<?php declare(strict_types=1);

namespace Navplan\MeteoGram\Domain\Service;

use Navplan\Common\Domain\Model\Position2d;
use Navplan\MeteoForecast\Domain\Model\WeatherModelConfig;


class ReadCloudMeteogramRequest {
    public function __construct(
        public WeatherModelConfig $modelConfig,
        public string $fcName,
        public int $minStep,
        public int $maxStep,
        public Position2d $pos
    ) {
    }
}
