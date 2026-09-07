<?php declare(strict_types=1);

namespace Navplan\MeteoRadar;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoRadar\Domain\Service\IMeteoRadarImagesConfig;
use Navplan\MeteoRadar\Domain\Service\IMeteoRadarImagesRepo;
use Navplan\MeteoRadar\FileSystem\Service\FileSystemRadarImagesRepo;
use Navplan\MeteoRadar\Rest\Service\MeteoRadarImageController;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;
use function DI\autowire;


class ProdMeteoRadarImagesDiContainer implements IMeteoRadarImagesDiContainer
{
    private Container $container;


    public function __construct(
        IFileService $fileService,
        IHttpService $httpService,
        IMeteoRadarImagesConfig $meteoRadarImagesConfig
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IFileService::class => $fileService,
            IHttpService::class => $httpService,
            IMeteoRadarImagesConfig::class => $meteoRadarImagesConfig,

            // interface -> implementation bindings (only mapping needed per class)
            IMeteoRadarImagesRepo::class => autowire(FileSystemRadarImagesRepo::class),
            IRestController::class => autowire(MeteoRadarImageController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getMeteoRadarImagesController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getMeteoRadarImagesRepo(): IMeteoRadarImagesRepo
    {
        return $this->container->get(IMeteoRadarImagesRepo::class);
    }
}

