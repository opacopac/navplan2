<?php declare(strict_types=1);

namespace Navplan\Flightroute\Domain;


class Flightroute {
    public $id;
    public $title;
    public $aircraftSpeedKt;
    public $aircraftConsumptionLpH;
    public $extraFuelL;
    public $comments;
    public $shareId;
    public $hash;
    public $waypoinList;
    public $alternate;


    public function __construct(
        ?int $id,
        string $title,
        ?float $aircraftSpeedKt,
        ?float $aircraftConsumptionLpH,
        ?float $extraFuelL,
        ?string $comments,
        ?string $shareId,
        ?string $hash,
        array $waypoinList,
        ?Waypoint $alternate
    ) {
        $this->id = $id;
        $this->title = $title;
        $this->aircraftSpeedKt = $aircraftSpeedKt;
        $this->aircraftConsumptionLpH = $aircraftConsumptionLpH;
        $this->extraFuelL = $extraFuelL;
        $this->comments = $comments;
        $this->shareId = $shareId;
        $this->hash = $hash;
        $this->waypoinList = $waypoinList;
        $this->alternate = $alternate;
    }
}
