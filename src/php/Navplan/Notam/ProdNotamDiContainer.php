<?php declare(strict_types=1);

namespace Navplan\Notam;

use Navplan\Config\ProdConfigDiContainer;
use Navplan\Notam\DbService\DbNotamRepo;
use Navplan\Notam\DomainService\INotamConfig;
use Navplan\Notam\DomainService\INotamService;
use Navplan\System\DomainService\IDbService;


class ProdNotamDiContainer implements INotamDiContainer {
    private INotamConfig $notamConfig;
    private INotamService $notamService;


    public function __construct(
        private readonly IDbService $dbService
    ) {
    }


    function getNotamConfig(): INotamConfig {
        if (!isset($this->notamConfig)) {
            $this->notamConfig = new ProdConfigDiContainer();
        }

        return $this->notamConfig;
    }


    public function getNotamService(): INotamService {
        if (!isset($this->notamService)) {
            $this->notamService = new DbNotamRepo($this->dbService);
        }

        return $this->notamService;
    }
}
