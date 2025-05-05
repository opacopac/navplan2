<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Model;


class ChartProjectionResult
{
    public function __construct(
        public string $outputChartFile,
        public WorldFileInfo $worldFileInfo,
    )
    {
    }
}
