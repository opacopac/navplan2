<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainService;

use Navplan\ChartConverter\DomainModel\AdPdfChart;
use Navplan\Common\DomainModel\Extent2d;


interface AdChartConverterPersistence {
    function readAdPdfChart(int $id): AdPdfChart;


    /**
     * @return AdPdfChart[]
     */
    function readAllAdPdfCharts(): array;


    function writeExtent(int $id, Extent2d $extent): void;
}
