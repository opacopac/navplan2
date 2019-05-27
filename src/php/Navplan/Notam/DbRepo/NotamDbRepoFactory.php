<?php declare(strict_types=1);

namespace Navplan\Notam\DbRepo;

use Navplan\Notam\IRepo\INotamRepo;
use Navplan\Notam\IRepo\INotamRepoFactory;
use Navplan\Shared\IDbService;


class NotamDbRepoFactory implements INotamRepoFactory {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function createNotamRepo(): INotamRepo {
        return new NotamDbRepo($this->getDbService());
    }
}
