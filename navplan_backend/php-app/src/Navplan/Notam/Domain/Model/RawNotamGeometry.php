<?php declare(strict_types=1);

namespace Navplan\Notam\Domain\Model;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Circle2d;
use Navplan\Common\Domain\Model\MultiRing2d;
use Navplan\Common\Domain\Model\Ring2d;


class RawNotamGeometry
{
    public function __construct(
        public ?Circle2d $circle = null,
        public ?Ring2d $polygon = null,
        public ?MultiRing2d $multipolygon = null,
        public ?Altitude $top = null,
        public ?Altitude $bottom = null
    )
    {
    }
}
