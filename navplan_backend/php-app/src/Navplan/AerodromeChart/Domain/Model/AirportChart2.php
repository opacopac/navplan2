<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;

use Navplan\Common\Domain\Model\Extent2d;


class AirportChart2
{
    public function __construct(
        public int $id,
        public string $airportIcao,
        public string $source,
        public string $type, // TODO: rename to name
        public string $filename,
        public Extent2d $extent,
        public OriginalFileParameters $originalFileParameters,
        public ChartRegistration $chartRegistration,
    )
    {
    }
}
