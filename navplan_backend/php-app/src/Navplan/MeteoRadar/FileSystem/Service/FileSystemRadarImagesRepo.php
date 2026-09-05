<?php declare(strict_types=1);

namespace Navplan\MeteoRadar\FileSystem\Service;

use DateInterval;
use DateTime;
use DateTimeZone;
use Navplan\MeteoRadar\Domain\Model\RadarImage;
use Navplan\MeteoRadar\Domain\Service\IMeteoRadarImagesConfig;
use Navplan\MeteoRadar\Domain\Service\IMeteoRadarImagesRepo;
use Navplan\System\Domain\Service\IFileService;


readonly class FileSystemRadarImagesRepo implements IMeteoRadarImagesRepo
{
    public function __construct(
        private IFileService $fileService,
        private IMeteoRadarImagesConfig $meteoRadarImagesConfig
    )
    {
    }


    /**
     * @return RadarImage[]
     */
    function readAvailableRadarImages(): array
    {
        $baseDir = $this->meteoRadarImagesConfig->getMeteoRadarImagesBaseDir();

        $subDirs = $this->fileService->glob(rtrim($baseDir, '/') . '/*', GLOB_ONLYDIR);
        if ($subDirs === false) {
            return [];
        }

        $radarImages = [];
        foreach ($subDirs as $subDir) {
            $dirName = basename($subDir);
            $endTime = DateTime::createFromFormat('YmdHi', $dirName, new DateTimeZone('UTC'));
            if (!$endTime || $endTime->format('YmdHi') !== $dirName) {
                continue;
            }

            $startTime = (clone $endTime)->sub(new DateInterval('PT5M'));
            $radarImages[] = new RadarImage($startTime, $endTime);
        }

        return $radarImages;
    }
}
