<?php declare(strict_types=1);

namespace Navplan\System;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\System\Db\Domain\Model\IDbConfig;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\MySqlDbService;
use function DI\factory;


class ProdPersistenceDiContainer implements IPersistenceDiContainer
{
    private Container $container;


    public function __construct(
        ISystemDiContainer $systemDiContainer,
        IDbConfig $dbConfig
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons
            ISystemDiContainer::class => $systemDiContainer,
            IDbConfig::class => $dbConfig,

            // MySqlDbService needs init() called with the db credentials after
            // construction, so it can't be wired via plain autowiring alone.
            IDbService::class => factory(function (ISystemDiContainer $systemDiContainer, IDbConfig $dbConfig) {
                $dbService = new MySqlDbService($systemDiContainer->getLoggingService());
                $dbService->init($dbConfig->getCredentials());

                return $dbService;
            }),
        ]);

        $this->container = $builder->build();
    }


    public function getDbService(): IDbService
    {
        return $this->container->get(IDbService::class);
    }
}
