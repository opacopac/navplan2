<?php declare(strict_types=1);

namespace Navplan\ChartConverter\ConsoleService;

use Navplan\ProdNavplanDiContainer;

require_once __DIR__ . "/../../ConsoleBootstrap.php";


if (!isset($argv[1]) || (intval($argv[1]) <= 0 && $argv[1] != 'all')) {
    print "argument for chartId is missing (positive id or 'all')!\n";
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
