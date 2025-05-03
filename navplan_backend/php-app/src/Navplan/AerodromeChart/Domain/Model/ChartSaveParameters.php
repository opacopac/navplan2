<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;


class ChartSaveParameters
{
    public function __construct(
        public string $chartUrl,
        public string $chartName,
        public OriginalFileParameters $originalFileParameters,
        public ChartRegistration $chartRegistration
    )
    {
    }
}
