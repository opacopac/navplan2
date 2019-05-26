<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\User\IRepo\IUserPointRepo;
use Navplan\User\IRepo\IUserRepoFactory;


class UserMockRepoFactory implements IUserRepoFactory {
    private $userPointRepoMock;


    public function __construct() {
        $this->userPointRepoMock = new UserPointRepoMock();
    }


    public function createUserPointRepo(): IUserPointRepo {
        return $this->userPointRepoMock;
    }

}
