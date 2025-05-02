<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;


use Navplan\Common\Domain\Model\XyCoord;
use Navplan\Common\Domain\SwissTopo\Ch1903Coordinate;

class ChartRegistration
{
    public function __construct(
        public ChartRegistrationType $registrationType,
        public XyCoord $pixelXy1,
        public Ch1903Coordinate $geoCoord1,
        public ?XyCoord $pixelXy2,
        public ?Ch1903Coordinate $geoCoord2,
        public int $scale
    )
    {
    }
}
