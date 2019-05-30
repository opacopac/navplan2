<?php declare(strict_types=1);

namespace Navplan\User\DbRepo;

use Navplan\Shared\IDbService;
use Navplan\User\UseCase\IUserPointSearch;
use Navplan\User\UseCase\IUserRepoFactory;


class DbUserRepoFactory implements IUserRepoFactory {
    private $dbService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    public function __construct(IDbService $dbService) {
        $this->dbService = $dbService;
    }


    public function createUserPointSearch(): IUserPointSearch {
        return new DbUserPointSearch($this->getDbService());
    }
}
