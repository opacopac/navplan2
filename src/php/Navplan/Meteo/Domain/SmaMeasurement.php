<?php declare(strict_types=1);

namespace Navplan\Meteo\Domain;

use Navplan\Geometry\Domain\Time;
use Navplan\Geometry\Domain\Timestamp;


class SmaMeasurement {
    public $station;
    public $timestamp;
    public $temperatureC;
    public $sunTime;
    public $precipMm;
    public $windDir;
    public $windSpeedKmh;
    public $windGustsKmh;
    public $qnhHpa;
    public $humitidyProc;


    public function __construct(
        SmaStation $station,
        Timestamp $timestamp,
        ?float $temperatureC,
        ?Time $sunTime,
        ?float $precipMm,
        ?int $windDir,
        ?float $windSpeedKmh,
        ?float $windGustsKmh,
        ?float $qnhHpa,
        ?int $humitidyProc
    ) {
        $this->station = $station;
        $this->timestamp = $timestamp;
        $this->temperatureC = $temperatureC;
        $this->sunTime = $sunTime;
        $this->precipMm = $precipMm;
        $this->windDir = $windDir;
        $this->windSpeedKmh = $windSpeedKmh;
        $this->windGustsKmh = $windGustsKmh;
        $this->qnhHpa = $qnhHpa;
        $this->humitidyProc = $humitidyProc;
    }
}
