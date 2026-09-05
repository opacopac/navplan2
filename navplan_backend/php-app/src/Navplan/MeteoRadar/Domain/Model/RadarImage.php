<?php declare(strict_types=1);

namespace Navplan\MeteoRadar\Domain\Model;

use DateTime;


class RadarImage
{
    public function __construct(
        public DateTime $startTime,
        public DateTime $endTime,
    )
    {
    }
}
