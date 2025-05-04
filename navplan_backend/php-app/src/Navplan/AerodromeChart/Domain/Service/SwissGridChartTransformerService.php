<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use InvalidArgumentException;
use Navplan\AerodromeChart\Domain\Model\ChartRegistration;
use Navplan\AerodromeChart\Domain\Model\WorldFileInfo;
use Navplan\Common\Domain\Model\Position2d;
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


    public function createChartProjektion(string $chartUrl, ChartRegistration $chartReg): string
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

        $worldFile = "/var/www/html/tmp/asdf.pfw";
        $worldFileInfo = $this->parseWorldFile($worldFile);

        var_dump($worldFileInfo);

        return $outputChart;
    }


    public function parseWorldFile(string $worldFile): WorldFileInfo {
        $file = $this->fileService->fopen($worldFile, "r");
        if ($file === false) {
            $error = "Could not open world file: $worldFile";
            $this->loggingService->error($error);
            throw new InvalidArgumentException($error);
        }

        $lines = [];
        for ($i = 0; $i < 6; $i++) {
            $line = fgets($file);
            if ($line === false) {
                $error = "Could not read line $i from world file: $worldFile";
                $this->loggingService->error($error);
                throw new InvalidArgumentException($error);
            }
            $lines[] = floatval(trim($line));
        }

        fclose($file);

        return new WorldFileInfo(
            $lines[0],
            $lines[1],
            $lines[2],
            $lines[3],
            new Position2d(
                $lines[5],
                $lines[4]
            )
        );
    }
}
