<?php declare(strict_types=1);

namespace Navplan\MetarTaf;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MetarTaf\Domain\Service\IMetarTafService;
use Navplan\MetarTaf\Domain\Service\MetarTafService;
use Navplan\MetarTaf\Rest\Service\ReadMetarTafController;
use Navplan\System\Domain\Service\IHttpService;
use function DI\autowire;


class ProdMetarTafDiContainer implements IMetarTafDiContainer
{
    private Container $container;


    public function __construct(
        IHttpService $httpService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IHttpService::class => $httpService,

            // interface -> implementation bindings (only mapping needed per class)
            IMetarTafService::class => autowire(MetarTafService::class),
            IRestController::class => autowire(ReadMetarTafController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getReadMetarTafController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getMetarTafService(): IMetarTafService
    {
        return $this->container->get(IMetarTafService::class);
    }
}

