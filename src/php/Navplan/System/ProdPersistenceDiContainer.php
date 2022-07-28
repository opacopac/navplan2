<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\DomainService\IDbService;
use Navplan\System\MySqlDb\IDbConfigService;
use Navplan\System\MySqlDb\MySqlDbService;


class ProdPersistenceDiContainer implements IPersistenceDiContainer
{
    private IDbService $dbService;


    public function __construct(
        private ISystemDiContainer2 $systemDiContainer,
        private IDbConfigService $dbConfigService
    ) {
    }


    public function getDbService(): IDbService {
        if (!isset($this->dbService)) {
            $this->dbService = new MySqlDbService(
                $this->systemDiContainer->getScreenLogger()
            );
            $this->dbService->init2(
                $this->dbConfigService->getCredentials()
            );
        }

        return $this->dbService;
    }
}
