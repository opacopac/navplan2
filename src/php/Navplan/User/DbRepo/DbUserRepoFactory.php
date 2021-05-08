<?php declare(strict_types=1);

namespace Navplan\User\DbRepo;

use Navplan\System\DomainService\IDbService;
use Navplan\User\DomainService\IUserPointRepo;
use Navplan\User\DomainService\IUserRepo;
use Navplan\User\DomainService\IUserRepoFactory;


class DbUserRepoFactory implements IUserRepoFactory {
    public function __construct(private IDbService $dbService) {
    }


    public function createUserRepo(): IUserRepo {
        return new DbUserRepo($this->dbService);
    }


    public function createUserPointRepo(): IUserPointRepo {
        return new DbUserPointRepo($this->dbService);
    }
}
