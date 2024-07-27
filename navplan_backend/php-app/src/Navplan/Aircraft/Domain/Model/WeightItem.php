<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;

use Navplan\Common\Domain\Model\Length;
use Navplan\Common\Domain\Model\Volume;
use Navplan\Common\Domain\Model\Weight;


class WeightItem
{
    public function __construct(
        public WeightItemType $type,
        public string $name,
        public Length $arm,
        public ?Weight $maxWeight,
        public ?Volume $maxFuel
    )
    {
    }
}
