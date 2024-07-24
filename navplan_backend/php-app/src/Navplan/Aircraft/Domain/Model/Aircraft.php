<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;

use Navplan\Common\Domain\Model\Consumption;
use Navplan\Common\Domain\Model\Speed;
use Navplan\Common\Domain\Model\Weight;


class Aircraft
{
    public function __construct(
        public int $id,
        public string $vehicleType,
        public string $registration,
        public string $icaoType,
        public Speed $cruiseSpeed,
        public Consumption $cruiseFuel,
        public ?string $fuelType,
        public ?Weight $mtow,
        public ?Weight $bew
    )
    {
    }
}
