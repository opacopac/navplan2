<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;


use Navplan\Common\Domain\Model\GeoCoordinate;
use Navplan\Common\Domain\Model\XyCoord;

class ChartRegistration
{
    public function __construct(
        public ChartRegistrationType $registrationType,
        public GeoCoordinateType $coordinateType,
        public XyCoord $pixelXy1,
        public GeoCoordinate $geoCoord1,
        public ?XyCoord $pixelXy2,
        public ?GeoCoordinate $geoCoord2,
        public int $scale
    )
    {
    }
}
