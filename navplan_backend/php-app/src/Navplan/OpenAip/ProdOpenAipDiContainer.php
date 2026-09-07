<?php declare(strict_types=1);

namespace Navplan\OpenAip;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Aerodrome\Domain\Service\IAirportService;
use Navplan\Airspace\Domain\Service\IAirspaceService;
use Navplan\Config\ProdConfigDiContainer;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\OpenAip\ApiAdapter\Service\IOpenAipService;
use Navplan\OpenAip\ApiAdapter\Service\OpenAipService;
use Navplan\OpenAip\Config\IOpenAipConfig;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;
use Navplan\OpenAip\Importer\Service\OpenAipImporter;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ICurlService;
use Navplan\System\Domain\Service\ILoggingService;
use function DI\autowire;


class ProdOpenAipDiContainer implements IOpenAipDiContainer
{
    private Container $container;


    public function __construct(
        IAirportService $airportService,
        IAirspaceService $airspaceService,
        INavaidService $navaidService,
        ILoggingService $loggingService,
        IDbService $dbService,
        ICurlService $curlService,
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons
            IAirportService::class => $airportService,
            IAirspaceService::class => $airspaceService,
            INavaidService::class => $navaidService,
            ILoggingService::class => $loggingService,
            IDbService::class => $dbService,
            ICurlService::class => $curlService,

            // interface -> implementation bindings
            IOpenAipConfig::class => autowire(ProdConfigDiContainer::class),
            IOpenAipService::class => autowire(OpenAipService::class),
            IOpenAipImporter::class => autowire(OpenAipImporter::class),
        ]);

        $this->container = $builder->build();
    }


    function getOpenAipConfig(): IOpenAipConfig
    {
        return $this->container->get(IOpenAipConfig::class);
    }


    public function getOpenAipImporter(): IOpenAipImporter
    {
        return $this->container->get(IOpenAipImporter::class);
    }


    public function getOpenAipApiService(): IOpenAipService
    {
        return $this->container->get(IOpenAipService::class);
    }
}
