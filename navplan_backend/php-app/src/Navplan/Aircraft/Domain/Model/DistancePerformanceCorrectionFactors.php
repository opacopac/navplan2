<?php declare(strict_types=1);

namespace Navplan\Aircraft\Domain\Model;

use Navplan\Common\Domain\Model\Speed;

class DistancePerformanceCorrectionFactors
{
    public function __construct(
        public float $grassRwyIncPercent,
        public float $wetRwyIncPercent,
        public float $headwindDecPercent,
        public Speed $headwindDecPerDelta,
        public float $tailwindIncPercent,
        public Speed $tailwindIncPerDelta,
    )
    {
    }
}
