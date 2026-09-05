<?php declare(strict_types=1);

namespace Navplan\MeteoRadar\FileSystem\Service;

use Navplan\MeteoRadar\Domain\Model\RadarImage;
use Navplan\MeteoRadar\Domain\Service\IMeteoRadarImagesRepo;
use Navplan\System\Domain\Service\IFileService;


readonly class FileSystemRadarImagesRepo implements IMeteoRadarImagesRepo
{
    public function __construct(
        private IFileService $fileService
    )
    {
    }


    /**
     * @return RadarImage[]
     */
    function readAvailableRadarImages(): array
    {
        // TODO: implement
        return [];
    }
}
