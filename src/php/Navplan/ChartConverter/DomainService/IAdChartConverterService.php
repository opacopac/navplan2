<?php declare(strict_types=1);

namespace Navplan\ChartConverter\DomainService;


interface IAdChartConverterService {
    function convertAllPdfToPng(): void;

    function renderAllPngToLonLat(): void;
}
