<?php declare(strict_types=1);

namespace Navplan\MeteoDwd\DomainModel;

use Navplan\Common\DomainModel\Angle;
use Navplan\Common\DomainModel\AngleUnit;
use Navplan\Common\DomainModel\Speed;


class WindSpeedDir {
    public function __construct(
        public Speed $speed,
        public Angle $dir
    ) {
    }


    public static function fromSpeedEN(float|null $speedE, float|null $speedN, int $unit): ?WindSpeedDir {
        if ($speedE === null || $speedN === null) {
            return null;
        }

        $speed = round(sqrt($speedE * $speedE + $speedN * $speedN), 1);
        $dir = round(atan2($speedN, $speedE) / pi() * 180, 1);

        return new WindSpeedDir(
            new Speed($speed, $unit),
            new Angle($dir, AngleUnit::DEG)
        );
    }
}
