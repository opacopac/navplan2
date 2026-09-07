<?php declare(strict_types=1);

namespace Navplan\MeteoForecast;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastConfig;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastPrecipRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastTempRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalCloudRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastVerticalWindRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastWeatherRepo;
use Navplan\MeteoForecast\Domain\Service\IMeteoForecastWindRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinForecastRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinPrecipRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinTempRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinVerticalCloudRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinVerticalWindRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinWeatherRepo;
use Navplan\MeteoForecast\MeteoBin\Service\MeteoBinWindRepo;
use Navplan\MeteoForecast\Rest\Service\MeteoForecastController;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;
use function DI\autowire;


class ProdMeteoForecastDiContainer implements IMeteoForecastDiContainer
{
    private Container $container;


    public function __construct(
        IFileService $fileService,
        IHttpService $httpService,
        IMeteoForecastConfig $meteoForecastConfig
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IFileService::class => $fileService,
            IHttpService::class => $httpService,
            IMeteoForecastConfig::class => $meteoForecastConfig,

            // interface -> implementation bindings (only mapping needed per class)
            IMeteoForecastRepo::class => autowire(MeteoBinForecastRepo::class),
            IMeteoForecastWeatherRepo::class => autowire(MeteoBinWeatherRepo::class),
            IMeteoForecastWindRepo::class => autowire(MeteoBinWindRepo::class),
            IMeteoForecastPrecipRepo::class => autowire(MeteoBinPrecipRepo::class),
            IMeteoForecastTempRepo::class => autowire(MeteoBinTempRepo::class),
            IMeteoForecastVerticalCloudRepo::class => autowire(MeteoBinVerticalCloudRepo::class),
            IMeteoForecastVerticalWindRepo::class => autowire(MeteoBinVerticalWindRepo::class),
            IRestController::class => autowire(MeteoForecastController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getMeteoForecastController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getMeteoForecastRepo(): IMeteoForecastRepo
    {
        return $this->container->get(IMeteoForecastRepo::class);
    }


    public function getMeteoForecastWeatherRepo(): IMeteoForecastWeatherRepo
    {
        return $this->container->get(IMeteoForecastWeatherRepo::class);
    }


    public function getMeteoForecastWindRepo(): IMeteoForecastWindRepo
    {
        return $this->container->get(IMeteoForecastWindRepo::class);
    }


    public function getMeteoForecastPrecipRepo(): IMeteoForecastPrecipRepo
    {
        return $this->container->get(IMeteoForecastPrecipRepo::class);
    }


    public function getMeteoForecastTempRepo(): IMeteoForecastTempRepo
    {
        return $this->container->get(IMeteoForecastTempRepo::class);
    }


    public function getMeteoForecastVerticalCloudRepo(): IMeteoForecastVerticalCloudRepo
    {
        return $this->container->get(IMeteoForecastVerticalCloudRepo::class);
    }


    public function getMeteoForecastVerticalWindRepo(): IMeteoForecastVerticalWindRepo
    {
        return $this->container->get(IMeteoForecastVerticalWindRepo::class);
    }
}
