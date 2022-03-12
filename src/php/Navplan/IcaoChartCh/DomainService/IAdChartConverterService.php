<?php declare(strict_types=1);

namespace Navplan\IcaoChartCh\DomainService;


interface IAdChartConverterService {
    function convertAllPdfToPng(): void;

    function renderPngToLonLat(): void;
}
