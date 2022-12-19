<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;

use Navplan\Common\DomainModel\Angle;
use Navplan\Common\DomainModel\AngleUnit;
use Navplan\Common\DomainModel\Position2d;
use Navplan\Common\DomainModel\Speed;
use Navplan\Common\DomainModel\SpeedUnit;


class WindInfo {
    public function __construct(
        public Speed $speed,
        public Angle $dir,
        public ?Speed $gustSpeed,
        public Position2d $pos
    ) {
    }


    public static function fromSpeedENGusts(
        float $speedE,
        float $speedN,
        float|null $gust,
        SpeedUnit $unit,
        Position2d $pos
    ): WindInfo {
        $speed = round(sqrt($speedE * $speedE + $speedN * $speedN), 1);
        $deg = round(atan2($speedN, $speedE) / pi() * 180, 1);
        $dir = (360 - $deg + 270) % 360;

        return new WindInfo(
            new Speed($speed, $unit),
            new Angle($dir, AngleUnit::DEG),
            $gust ? new Speed(round($gust, 1), $unit) : null,
            $pos
        );
    }
}
