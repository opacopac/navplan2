<?php declare(strict_types=1);

namespace Navplan\ChartConverter\ConsoleService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../ConsoleBootstrap.php";

ini_set('memory_limit', '5G');


if (!isset($argv[1]) || (intval($argv[1]) <= 0 && $argv[1] != 'all')) {
    print "ERROR: invalid or missing argument for chart-ID (positive int or 'all')!\n";
    die;
}

$diContainer = new ProdNavplanDiContainer();
$adPdfChartService = $diContainer->getAdPdfChartService();

$chartId = intval($argv[1]);
if ($chartId > 0) {
    $adPdfChartService->convertAdChart($chartId);
} else {
    $adPdfChartService->convertAllAdCharts();
}
