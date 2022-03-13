<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainService;


interface IAdChartConverterService {
    function convertAdChart(int $id): void;

    function convertAllAdCharts(): void;
}
