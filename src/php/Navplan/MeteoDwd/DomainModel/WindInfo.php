<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;

use Navplan\Common\DomainModel\Angle;
use Navplan\Common\DomainModel\AngleUnit;
use Navplan\Common\DomainModel\Speed;


class WindInfo {
    public function __construct(
        public Speed $speed,
        public Angle $dir,
        public ?Speed $gustSpeed
    ) {
    }


    public static function fromSpeedENGusts(float|null $speedE, float|null $speedN, float|null $gust, int $unit): ?WindInfo {
        if ($speedE === null || $speedN === null) {
            return null;
        }

        $speed = round(sqrt($speedE * $speedE + $speedN * $speedN), 1);
        $deg = round(atan2($speedN, $speedE) / pi() * 180, 1);
        $dir = (360 - $deg + 270) % 360;

        return new WindInfo(
            new Speed($speed, $unit),
            new Angle($dir, AngleUnit::DEG),
            $gust ? new Speed(round($gust, 1), $unit) : null
        );
    }
}
