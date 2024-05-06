<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\Domain\Service\IDbService;
use Navplan\System\MySqlDb\IDbConfig;
use Navplan\System\MySqlDb\MySqlDbService;


class ProdPersistenceDiContainer implements IPersistenceDiContainer
{
    private IDbService $dbService;


    public function __construct(
        private readonly ISystemDiContainer $systemDiContainer,
        private readonly IDbConfig $dbConfig
    ) {
    }


    public function getDbService(): IDbService {
        if (!isset($this->dbService)) {
            $this->dbService = new MySqlDbService(
                $this->systemDiContainer->getLoggingService()
            );
            $this->dbService->init2(
                $this->dbConfig->getCredentials()
            );
        }

        return $this->dbService;
    }
}
