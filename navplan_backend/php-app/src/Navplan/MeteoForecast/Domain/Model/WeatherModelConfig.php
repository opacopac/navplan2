<?php declare(strict_types=1);

namespace Navplan\MeteoForecast\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Time;


class WeatherModelConfig
{
    public function __construct(
        public int $modelType,
        public int $minStep,
        public int $maxStep,
        public Time $stepLength,
        public GridDefinition $gridDefinition,
        public Length $gridResolution,
        public int $vertLayers,
        public string $baseDir,
    )
    {
    }
}
