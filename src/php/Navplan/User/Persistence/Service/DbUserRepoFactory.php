<?php declare(strict_types=1);

namespace Navplan\User\Persistence\Service;

use Navplan\System\Domain\Service\IDbService;
use Navplan\User\Domain\Service\IUserPointRepo;
use Navplan\User\Domain\Service\IUserRepo;
use Navplan\User\Domain\Service\IUserRepoFactory;


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
