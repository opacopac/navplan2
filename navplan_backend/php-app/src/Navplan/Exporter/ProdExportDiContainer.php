<?php declare(strict_types=1);

namespace Navplan\Exporter;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Exporter\Domain\Service\IExportService;
use Navplan\Exporter\FileExportService\FileExportService;
use Navplan\Exporter\Rest\Controller\ExporterController;
use Navplan\System\Domain\Service\IFileService;
use Navplan\System\Domain\Service\IHttpService;
use function DI\autowire;


class ProdExportDiContainer implements IExporterDiContainer
{
    private Container $container;


    public function __construct(
        IFileService $fileService,
        IHttpService $httpService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IFileService::class => $fileService,
            IHttpService::class => $httpService,

            // interface -> implementation bindings (only mapping needed per class)
            // NavplanPdfBuilder/KmlBuilder/GpxBuilder/FplBuilder/ExcelBuilder are
            // resolved automatically via autowiring (concrete, no-arg constructors).
            IExportService::class => autowire(FileExportService::class),
            IRestController::class => autowire(ExporterController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getExportController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getExportService(): IExportService
    {
        return $this->container->get(IExportService::class);
    }
}

