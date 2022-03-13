<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainService;

use Navplan\ChartConverter\DomainModel\AdPdfChart;
use Navplan\ChartConverter\DomainModel\AdPngCh1903Chart;


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
