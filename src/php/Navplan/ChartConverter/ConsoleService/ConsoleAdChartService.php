<?php declare(strict_types=1);

namespace Navplan\ChartConverter\ConsoleService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../ConsoleBootstrap.php";


$diContainer = new ProdNavplanDiContainer();
$adPdfChartService = $diContainer->getAdPdfChartService();
//$adPdfChartService->convertAllPdfToPng();
//$adPdfChartService->renderAllPngToLonLat();
//$adPdfChartService->convertAdChart(3);
$adPdfChartService->convertAllAdCharts();
