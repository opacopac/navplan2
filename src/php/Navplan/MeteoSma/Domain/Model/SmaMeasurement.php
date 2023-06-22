<?php declare(strict_types=1);

namespace Navplan\MeteoSma\Domain\Model;

use Navplan\Common\DomainModel\Time;
use Navplan\Common\DomainModel\Timestamp;


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
