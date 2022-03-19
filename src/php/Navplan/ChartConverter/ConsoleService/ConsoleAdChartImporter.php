<?php declare(strict_types=1);

namespace Navplan\ChartConverter\ConsoleService;

use Navplan\ProdNavplanDiContainerImporter;

require_once __DIR__ . "/../../ConsoleBootstrap.php";

ini_set('memory_limit', '5G');


if (!isset($argv[1]) || (intval($argv[1]) <= 0 && $argv[1] != 'all')) {
    print "ERROR: invalid or missing argument for chart-ID (positive int or 'all')!\n";
    die;
}

$diContainer = new ProdNavplanDiContainerImporter();
$adPdfChartService = $diContainer->getImportAdChartService();

$chartId = intval($argv[1]);
if ($chartId > 0) {
    $adPdfChartService->importAdChart($chartId);
} else {
    $adPdfChartService->importAllAdCharts();
}