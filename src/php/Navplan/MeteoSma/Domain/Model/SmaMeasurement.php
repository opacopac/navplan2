<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Domain\Model;

use Navplan\Common\Domain\Model\Time;
use Navplan\Common\Domain\Model\Timestamp;


class SmaMeasurement {
    public function __construct(
        public SmaStation $station,
        public Timestamp $timestamp,
        public ?float $temperatureC,
        public ?Time $sunTime,
        public ?float $precipMm,
        public ?int $windDir,
        public ?float $windSpeedKmh,
        public ?float $windGustsKmh,
        public ?float $qnhHpa,
        public ?int $humitidyProc
    ) {
    }
}
