<?php declare(strict_types=1);

namespace Navplan\Notam;

use Navplan\Config\ProdConfigDiContainer;
use Navplan\Notam\DbService\DbNotamRepo;
use Navplan\Notam\DomainService\INotamConfigService;
use Navplan\Notam\DomainService\INotamService;
use Navplan\System\DomainService\IDbService;


class ProdNotamDiContainer implements INotamDiContainer {
    private INotamConfigService $notamConfigService;
    private INotamService $notamService;


    public function __construct(
        private IDbService $dbService
    ) {
    }


    function getNotamConfigService(): INotamConfigService {
        if (!isset($this->notamConfigService)) {
            $this->notamConfigService = new ProdConfigDiContainer();
        }

        return $this->notamConfigService;
    }


    public function getNotamService(): INotamService {
        if (!isset($this->notamService)) {
            $this->notamService = new DbNotamRepo($this->dbService);
        }

        return $this->notamService;
    }
}
