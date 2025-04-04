<?php declare(strict_types=1);

namespace Navplan\AerodromeReporting\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\Model\Ring2d;


// TODO: split into ReportingPoint & ReportingSector
class ReportingPoint {
    public function __construct(
        public int $id,
        public string $type,
        public string $airport_icao,
        public string $name,
        public bool $heli,
        public bool $inbd_comp,
        public bool $outbd_comp,
        public ?Length $alt_min,
        public ?Length $alt_max,
        public ?Position2d $position,
        public ?Ring2d $polygon
    ) {
    }
}
