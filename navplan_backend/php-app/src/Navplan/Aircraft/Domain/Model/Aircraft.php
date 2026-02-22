<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;

use Navplan\Common\Domain\Model\Consumption;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\Weight;


class Aircraft
{
    /**
     * @param int $id
     * @param VehicleType $vehicleType
     * @param string $registration
     * @param string $icaoType
     * @param Speed $cruiseSpeed
     * @param Consumption $cruiseFuel
     * @param FuelType|null $fuelType
     * @param Weight|null $mtow
     * @param Weight|null $bew
     * @param Speed|null $rocSealevel
     * @param Length|null $serviceCeiling
     * @param Speed|null $cruiseClimbSpeed
     * @param DistancePerformanceTable|null $perfTakeoffGroundRoll
     * @param DistancePerformanceTable|null $perfTakeoffDist50ft
     * @param DistancePerformanceTable|null $perfLandingGroundRoll
     * @param DistancePerformanceTable|null $perfLandingDist50ft
     * @param WeightItem[] $wnbWeightItems
     * @param WnbEnvelope[] $wnbLonEnvelopes
     */
    public function __construct(
        public int $id,
        public VehicleType $vehicleType,
        public string $registration,
        public string $icaoType,
        public Speed $cruiseSpeed,
        public Consumption $cruiseFuel,
        public ?FuelType $fuelType,
        public ?Weight $mtow,
        public ?Weight $bew,
        public ?Speed $rocSealevel,
        public ?Length $serviceCeiling,
        public ?Speed $cruiseClimbSpeed,
        public ?DistancePerformanceTable $perfTakeoffGroundRoll,
        public ?DistancePerformanceTable $perfTakeoffDist50ft,
        public ?DistancePerformanceTable $perfLandingGroundRoll,
        public ?DistancePerformanceTable $perfLandingDist50ft,
        public array $wnbWeightItems,
        public array $wnbLonEnvelopes,
    )
    {
    }
}
