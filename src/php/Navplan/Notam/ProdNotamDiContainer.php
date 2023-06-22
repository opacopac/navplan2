<?php declare(strict_types=1);

namespace Navplan\Notam;

use Navplan\Config\ProdConfigDiContainer;
use Navplan\Notam\Domain\Service\INotamConfig;
use Navplan\Notam\Domain\Service\INotamService;
use Navplan\Notam\Persistence\Service\DbNotamRepo;
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
