<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainService;

use Navplan\ChartConverter\DomainModel\AdPdfChart;


interface AdChartConverterPersistence {
    function readAdPdfChart(int $id): AdPdfChart;


    /**
     * @return AdPdfChart[]
     */
    function readAllAdPdfCharts(): array;
}
