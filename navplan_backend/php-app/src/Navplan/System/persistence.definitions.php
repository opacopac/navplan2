<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the Persistence (DB) module.
 * Replaces the former ProdPersistenceDiContainer.
 */

use Navplan\System\Db\Domain\Model\IDbConfig;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\MySqlDbService;
use Navplan\System\Domain\Service\ILoggingService;
use function DI\factory;

return [
    // MySqlDbService needs init() called with the db credentials after
    // construction, so it can't be wired via plain autowiring alone.
    // Depends directly on ILoggingService and IDbConfig (both resolved from
    // system.definitions.php / config.definitions.php in the same container).
    IDbService::class => factory(function (ILoggingService $loggingService, IDbConfig $dbConfig) {
        $dbService = new MySqlDbService($loggingService);
        $dbService->init($dbConfig->getCredentials());

        return $dbService;
    }),
];

