<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;

use Navplan\Common\Domain\Model\Consumption;
use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\Weight;


class Aircraft
{
    /**
     * @param int $id
     * @param string $vehicleType
     * @param string $registration
     * @param string $icaoType
     * @param Speed $cruiseSpeed
     * @param Consumption $cruiseFuel
     * @param FuelType|null $fuelType
     * @param Weight|null $mtow
     * @param Weight|null $bew
     * @param DistancePerformanceTable|null $perfTakeoffGroundRoll
     * @param DistancePerformanceTable|null $perfTakeoffDist50ft
     * @param DistancePerformanceTable|null $perfLandingGroundRoll
     * @param DistancePerformanceTable|null $perfLandingDist50ft
     * @param WeightItem[] $wnbWeightItems
     * @param WnbEnvelopeCoordinate[] $wnbEnvelopes
     */
    public function __construct(
        public int $id,
        public string $vehicleType,
        public string $registration,
        public string $icaoType,
        public Speed $cruiseSpeed,
        public Consumption $cruiseFuel,
        public ?FuelType $fuelType,
        public ?Weight $mtow,
        public ?Weight $bew,
        public ?DistancePerformanceTable $perfTakeoffGroundRoll,
        public ?DistancePerformanceTable $perfTakeoffDist50ft,
        public ?DistancePerformanceTable $perfLandingGroundRoll,
        public ?DistancePerformanceTable $perfLandingDist50ft,
        public array $wnbWeightItems,
        public array $wnbEnvelopes,
    )
    {
    }
}
