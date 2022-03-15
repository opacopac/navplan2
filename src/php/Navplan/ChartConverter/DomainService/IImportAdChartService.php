<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainService;


interface IImportAdChartService {
    function importAdChart(int $id): void;

    function importAllAdCharts(): void;
}
