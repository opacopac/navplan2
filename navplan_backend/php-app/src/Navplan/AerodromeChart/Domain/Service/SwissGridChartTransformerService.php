<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use Navplan\AerodromeChart\Domain\Model\ChartRegistration;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\ILoggingService;

class SwissGridChartTransformerService implements ISwissGridChartTransformerService
{
    public function __construct(
        private IFileService $fileService,
        private ILoggingService $loggingService
    )
    {
    }


    function createChartProjektion(string $chartUrl, ChartRegistration $chartReg): string
    {
        // TODO reproject chart
        // USAGE: swissgrid_chart_transformer [OPTIONS] --chart <CHART> --output <OUTPUT>
        // options: z.b. pos1_pos2_rot: TBD (e.g. 10,10,7.0,47.0,20,20,8.0,46.0)
        $exe = "/var/www/html/tools/swissgrid_chart_transformer";
        $options = "-r "
            . $chartReg->pixelXy1->getIntX() . " "
            . $chartReg->pixelXy1->getIntY() . " "
            . $chartReg->geoCoord1->getE() . " "
            . $chartReg->geoCoord1->getN() . " "
            . $chartReg->pixelXy2->getIntX() . " "
            . $chartReg->pixelXy2->getIntY() . " "
            . $chartReg->geoCoord2->getE() . " "
            . $chartReg->geoCoord2->getN();
        $chart = $chartUrl;
        $outputChart = "/var/www/html/tmp/asdf.png";
        $command = "$exe $options --chart $chart --output $outputChart";

        $this->loggingService->debug("Executing Shell Command: $command");

        $shelloutput = shell_exec($command);

        return $outputChart;
    }
}
