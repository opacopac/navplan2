<?php declare(strict_types=1);

namespace Navplan\AerodromeCircuit;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\AerodromeCircuit\Domain\Service\IAirportCircuitService;
use Navplan\AerodromeCircuit\Persistence\Repo\DbAirportCircuitRepo;
use Navplan\AerodromeCircuit\Rest\Controller\AdCircuitController;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use function DI\autowire;


class ProdAerodromeCircuitsDiContainer implements IAerodromeCircuitDiContainer
{
    private Container $container;


    public function __construct(
        IDbService $dbService,
        IHttpService $httpService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            IDbService::class => $dbService,
            IHttpService::class => $httpService,

            // interface -> implementation bindings (only mapping needed per class)
            IAirportCircuitService::class => autowire(DbAirportCircuitRepo::class),
            IRestController::class => autowire(AdCircuitController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getAirportCircuitController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getAirportCircuitService(): IAirportCircuitService
    {
        return $this->container->get(IAirportCircuitService::class);
    }
}

