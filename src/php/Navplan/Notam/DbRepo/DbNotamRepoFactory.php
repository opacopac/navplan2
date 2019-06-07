<?php declare(strict_types=1);

namespace Navplan\Notam\DbRepo;

use Navplan\Notam\UseCase\INotamRepo;
use Navplan\Notam\UseCase\INotamRepoFactory;
use Navplan\Db\IDb\IDbService;


class DbNotamRepoFactory implements INotamRepoFactory {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function createNotamSearch(): INotamRepo {
        return new DbNotamRepo($this->getDbService());
    }
}
