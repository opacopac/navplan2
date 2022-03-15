<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainService;

use Navplan\ChartConverter\DomainModel\ImportAdChart;
use Navplan\Common\DomainModel\Extent2d;


interface IImportAdChartPersistence {
    function readAdPdfChart(int $id): ImportAdChart;

    /**
     * @return ImportAdChart[]
     */
    function readAllAdPdfCharts(): array;

    function writeExtent(int $id, Extent2d $extent): void;
}
