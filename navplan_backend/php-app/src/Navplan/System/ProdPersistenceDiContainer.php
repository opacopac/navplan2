<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\Db\Domain\Model\IDbConfig;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Db\MySql\MySqlDbService;


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
