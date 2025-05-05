<?php declare(strict_types=1);

namespace Navplan\AerodromeChart\Domain\Service;

use InvalidArgumentException;
use Navplan\AerodromeChart\Domain\Model\ChartProjectionResult;
use Navplan\AerodromeChart\Domain\Model\ChartRegistration;
use Navplan\AerodromeChart\Domain\Model\WorldFileInfo;
use Navplan\Common\Domain\Model\Position2d;
use Navplan\Common\Domain\SwissTopo\Lv03Coordinate;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Domain\Service\IProcService;


class SwissGridChartTransformerService implements ISwissGridChartTransformerService
{
    public function __construct(
        private IFileService $fileService,
        private IProcService $procService,
        private ILoggingService $loggingService,
    )
    {
    }


    public function createChartProjektion(string $chartFile, ChartRegistration $chartReg): ChartProjectionResult
    {
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
        $outputChart = $this->fileService->appendFilename($chartFile, "_output");
        $command = "$exe $options --chart $chartFile --output $outputChart";

        $this->loggingService->debug("Executing Shell Command: $command");
        $this->procService->shell_exec($command);

        $worldFile = $this->getWorldFile($outputChart);
        $worldFileInfo = $this->parseWorldFile($worldFile);

        return new ChartProjectionResult(
            $outputChart,
            $worldFileInfo
        );
    }


    public function getWorldFile(string $chartFile): string
    {
        $extension = pathinfo($chartFile, PATHINFO_EXTENSION);
        if ($extension === "") {
            return $chartFile . ".wld";
        } else {
            return $chartFile . "w";
        }
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
