<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use InvalidArgumentException;
use Navplan\AerodromeChart\Domain\Model\ChartRegistration;
use Navplan\AerodromeChart\Domain\Model\WorldFileInfo;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\SwissTopo\Lv03Coordinate;
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
        $coord1 = Lv03Coordinate::fromLatLon($chartReg->geoCoord1->toLatLon());
        $coord2 = Lv03Coordinate::fromLatLon($chartReg->geoCoord2->toLatLon());
        $exe = "/var/www/html/tools/swissgrid_chart_transformer";
        $options = "-r "
            . $chartReg->pixelXy1->getIntX() . " "
            . $chartReg->pixelXy1->getIntY() . " "
            . $coord1->getE() . " "
            . $coord1->getN() . " "
            . $chartReg->pixelXy2->getIntX() . " "
            . $chartReg->pixelXy2->getIntY() . " "
            . $coord2->getE() . " "
            . $coord2->getN();
        $chart = $chartUrl;
        $outputChart = "/var/www/html/tmp/asdf.png";
        $command = "$exe $options --chart $chart --output $outputChart";

        $this->loggingService->debug("Executing Shell Command: $command");

        $shelloutput = shell_exec($command);

        $worldFile = "/var/www/html/tmp/asdf.pfw";
        $worldFileInfo = $this->parseWorldFile($worldFile);

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
            $line = $file->fgets();
            if ($line === false) {
                $error = "Could not read line $i from world file: $worldFile";
                $this->loggingService->error($error);
                throw new InvalidArgumentException($error);
            }
            $lines[] = floatval(trim($line));
        }

        $file->fclose();

        $wfInfo = new WorldFileInfo(
            $lines[0],
            $lines[1],
            $lines[2],
            $lines[3],
            new Position2d(
                $lines[4],
                $lines[5]
            )
        );

        return $wfInfo;
    }
}
