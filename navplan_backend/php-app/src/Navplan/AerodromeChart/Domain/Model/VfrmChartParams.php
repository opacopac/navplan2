<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;


class VfrmChartParams
{
    public function __construct(
        public string $icao,
        public string $chartNameProposal,
        public int $scaleProposal,
    )
    {
    }
}
