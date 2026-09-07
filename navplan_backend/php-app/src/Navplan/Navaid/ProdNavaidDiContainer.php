<?php declare(strict_types=1);

namespace Navplan\Navaid;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Navaid\Domain\Command\INavaidDeleteAllCommand;
use Navplan\Navaid\Domain\Command\INavaidInsertAllCommand;
use Navplan\Navaid\Domain\Query\INavaidSearchByExtentQuery;
use Navplan\Navaid\Domain\Query\INavaidSearchByPositionQuery;
use Navplan\Navaid\Domain\Query\INavaidSearchByTextQuery;
use Navplan\Navaid\Domain\Service\INavaidService;
use Navplan\Navaid\Domain\Service\NavaidService;
use Navplan\Navaid\Persistence\Command\DbNavaidDeleteAllCommand;
use Navplan\Navaid\Persistence\Command\DbNavaidInsertAllCommand;
use Navplan\Navaid\Persistence\Query\DbNavaidSearchByExtentQuery;
use Navplan\Navaid\Persistence\Query\DbNavaidSearchByPositionQuery;
use Navplan\Navaid\Persistence\Query\DbNavaidSearchByTextQuery;
use Navplan\Navaid\Rest\Controller\NavaidController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\System\Domain\Service\ILoggingService;
use function DI\autowire;


/**
 * Replaces the previous manual, hand-written lazy-init getters (formerly
 * ProdNavaidDiContainer, 133 lines) with a PHP-DI autowiring container (~45 lines).
 *
 * - No manual "new X(...)" calls: constructor arguments are resolved via reflection.
 * - No manual "isset($this->x)" caching: PHP-DI caches resolved instances (singletons) itself.
 * - Adding a new constructor dependency to e.g. NavaidService no longer requires
 *   touching this container at all, as long as the dependency type is bound/autowirable.
 * - Only the mapping "interface -> concrete implementation" needs to be declared once,
 *   since PHP cannot autowire interfaces without knowing which implementation to pick.
 */
class ProdNavaidDiContainer implements INavaidDiContainer
{
    private Container $container;


    public function __construct(
        ILoggingService $loggingService,
        IDbService $dbService,
        IHttpService $httpService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons (shared across all domains)
            ILoggingService::class => $loggingService,
            IDbService::class => $dbService,
            IHttpService::class => $httpService,

            // interface -> implementation bindings (only mapping needed per class)
            INavaidSearchByExtentQuery::class => autowire(DbNavaidSearchByExtentQuery::class),
            INavaidSearchByPositionQuery::class => autowire(DbNavaidSearchByPositionQuery::class),
            INavaidSearchByTextQuery::class => autowire(DbNavaidSearchByTextQuery::class),
            INavaidInsertAllCommand::class => autowire(DbNavaidInsertAllCommand::class),
            INavaidDeleteAllCommand::class => autowire(DbNavaidDeleteAllCommand::class),
            INavaidService::class => autowire(NavaidService::class),
            IRestController::class => autowire(NavaidController::class),
        ]);

        $this->container = $builder->build();
    }


    public function getNavaidController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getNavaidService(): INavaidService
    {
        return $this->container->get(INavaidService::class);
    }


    public function getNavaidSearchByExtentQuery(): INavaidSearchByExtentQuery
    {
        return $this->container->get(INavaidSearchByExtentQuery::class);
    }


    public function getNavaidSearchByPositionQuery(): INavaidSearchByPositionQuery
    {
        return $this->container->get(INavaidSearchByPositionQuery::class);
    }


    public function getNavaidSearchByTextQuery(): INavaidSearchByTextQuery
    {
        return $this->container->get(INavaidSearchByTextQuery::class);
    }


    public function getNavaidInsertAllCommand(): INavaidInsertAllCommand
    {
        return $this->container->get(INavaidInsertAllCommand::class);
    }


    public function getNavaidDeleteAllCommand(): INavaidDeleteAllCommand
    {
        return $this->container->get(INavaidDeleteAllCommand::class);
    }
}

