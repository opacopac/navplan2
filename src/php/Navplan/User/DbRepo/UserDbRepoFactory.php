<?php declare(strict_types=1);

namespace Navplan\User\DbRepo;

use Navplan\Shared\IDbService;
use Navplan\User\IRepo\IUserPointRepo;
use Navplan\User\IRepo\IUserRepoFactory;


class UserDbRepoFactory implements IUserRepoFactory {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function createUserPointRepo(): IUserPointRepo {
        return new UserPointDbRepo($this->getDbService());
    }
}
