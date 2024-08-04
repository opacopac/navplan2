<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Command;

use Navplan\Aircraft\Domain\Model\WeightItem;


interface IWeightItemCreateCommand
{
    /**
     * @param int $aircraftId
     * @param WeightItem[] $weightItems
     */
    function create(int $aircraftId, array $weightItems): void;
}
