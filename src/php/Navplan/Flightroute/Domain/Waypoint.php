<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain;

use Navplan\Geometry\Domain\Position2d;


class Waypoint {
    public $type;
    public $frequency;
    public $callsign;
    public $checkpoint;
    public $altitude;
    public $isMinAlt;
    public $isMaxAlt;
    public $isAltAtLegStart;
    public $remark;
    public $suppInfo;
    public $position;
    public $airportIcao;
    public $isAlternate;


    public function __construct(
        string $type,
        string $frequency,
        string $callsign,
        string $checkpoint,
        string $altitude,
        bool $isMinAlt,
        bool $isMaxAlt,
        bool $isAltAtLegStart,
        string $remark,
        ?string $suppInfo,
        Position2d $position,
        ?string $airportIcao,
        bool $isAlternate
    ) {
        $this->type = $type;
        $this->frequency = $frequency;
        $this->callsign = $callsign;
        $this->checkpoint = $checkpoint;
        $this->airportIcao = $airportIcao;
        $this->position = $position;
        $this->altitude = $altitude;
        $this->isMinAlt = $isMinAlt;
        $this->isMaxAlt = $isMaxAlt;
        $this->isAltAtLegStart = $isAltAtLegStart;
        $this->remark = $remark;
        $this->suppInfo = $suppInfo;
        $this->isAlternate = $isAlternate;
    }
}
