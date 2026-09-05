<?php declare(strict_types=1);

namespace Navplan\MeteoRadar;

use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoRadar\Domain\Service\IMeteoRadarImagesRepo;
use Navplan\MeteoRadar\FileSystem\Service\FileSystemRadarImagesRepo;
use Navplan\MeteoRadar\Rest\Service\MeteoRadarImageController;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;


class ProdMeteoRadarImagesDiContainer implements IMeteoRadarImagesDiContainer
{
    private IRestController $meteoRadarImagesRestController;
    private IMeteoRadarImagesRepo $radarImagesRepo;


    public function __construct(
        private readonly IFileService $fileService,
        private readonly IHttpService $httpService
    )
    {
    }


    public function getMeteoRadarImagesController(): IRestController
    {
        if (!isset($this->meteoRadarImagesRestController)) {
            $this->meteoRadarImagesRestController = new MeteoRadarImageController(
                $this->getMeteoRadarImagesRepo(),
                $this->httpService
            );
        }

        return $this->meteoRadarImagesRestController;
    }


    public function getMeteoRadarImagesRepo(): IMeteoRadarImagesRepo
    {
        if (!isset($this->radarImagesRepo)) {
            $this->radarImagesRepo = new FileSystemRadarImagesRepo(
                $this->fileService
            );
        }

        return $this->radarImagesRepo;
    }
}
