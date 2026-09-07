<?php declare(strict_types=1);

namespace Navplan\Admin;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Admin\Domain\Service\AdminServiceImpl;
use Navplan\Admin\Domain\Service\IAdminService;
use Navplan\OpenAip\Importer\Service\IOpenAipImporter;
use function DI\autowire;


class ProdAdminDiContainer implements IAdminDiContainer
{
    private Container $container;


    public function __construct(
        IOpenAipImporter $openAipImporter
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IOpenAipImporter::class => $openAipImporter,

            // interface -> implementation bindings (only mapping needed per class)
            IAdminService::class => autowire(AdminServiceImpl::class),
        ]);

        $this->container = $builder->build();
    }


    public function getAdminService(): IAdminService
    {
        return $this->container->get(IAdminService::class);
    }
}
