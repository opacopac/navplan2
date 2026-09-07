<?php declare(strict_types=1);

namespace Navplan\MeteoSma;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\MeteoSma\Domain\Service\IMeteoSmaService;
use Navplan\MeteoSma\Persistence\Service\DbMeteoSmaRepo;
use Navplan\MeteoSma\Rest\Service\MeteoSmaController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ITimeService;
use function DI\autowire;


class ProdMeteoSmaDiContainer implements IMeteoSmaDiContainer
{
    private Container $container;


    public function __construct(
        IDbService $dbService,
        ITimeService $timeService,
        IHttpService $httpService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IDbService::class => $dbService,
            ITimeService::class => $timeService,
            IHttpService::class => $httpService,

            // interface -> implementation bindings (only mapping needed per class)
            IMeteoSmaService::class => autowire(DbMeteoSmaRepo::class),
            IRestController::class => autowire(MeteoSmaController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getMeteoSmaController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getMeteoSmaService(): IMeteoSmaService
    {
        return $this->container->get(IMeteoSmaService::class);
    }
}

