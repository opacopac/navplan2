<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Time;
use Navplan\Common\Domain\Model\TimeUnit;


class WeatherModelConfig {
    public function __construct(
        public int $modelType,
        public int $minStep,
        public int $maxStep,
        public Time $stepLength,
        public Length $gridResolution
    ) {
    }


    // TODO: dynamic
    public static function getIconD2ModelConfig(): WeatherModelConfig {
        return new WeatherModelConfig(
            WeatherModelType::ICON_D2,
            2,
            48,
            new Time(1, TimeUnit::H),
            Length::fromM(2200)
        );
    }
}
