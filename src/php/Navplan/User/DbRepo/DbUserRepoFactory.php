<?php declare(strict_types=1);

namespace Navplan\User\DbRepo;

use Navplan\Db\IDb\IDbService;
use Navplan\User\UseCase\IUserPointRepo;
use Navplan\User\UseCase\IUserRepo;
use Navplan\User\UseCase\IUserRepoFactory;


class DbUserRepoFactory implements IUserRepoFactory {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function createUserRepo(): IUserRepo {
        return new DbUserRepo($this->getDbService());
    }


    public function createUserPointRepo(): IUserPointRepo {
        return new DbUserPointRepo($this->getDbService());
    }
}
