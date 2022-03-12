<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\DomainService;

use Navplan\IcaoChartCh\DomainModel\AdPdfChart;
use Navplan\IcaoChartCh\DomainModel\AdPngCh1903Chart;


interface AdChartConverterPersistence {
    /**
     * @return AdPdfChart[]
     */
    function readAllAdPdfCharts(): array;


    /**
     * @return AdPngCh1903Chart[]
     */
    function readAllAdPngCh1903Charts(): array;
}
