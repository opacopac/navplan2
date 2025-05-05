<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;


interface IAerodromeChartConfig
{
    function getChartBaseDir(): string;
}
