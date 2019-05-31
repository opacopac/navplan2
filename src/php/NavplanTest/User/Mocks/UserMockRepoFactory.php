<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\User\UseCase\IUserPointRepo;
use Navplan\User\UseCase\IUserRepo;
use Navplan\User\UseCase\IUserRepoFactory;


class UserMockRepoFactory implements IUserRepoFactory {
    private $userRepoMock;
    private $userPointRepoMock;


    public function __construct() {
        $this->userRepoMock = new UserRepoMock();
        $this->userPointRepoMock = new UserPointRepoMock();
    }


    public function createUserPointRepo(): IUserPointRepo {
        return $this->userPointRepoMock;
    }


    public function createUserRepo(): IUserRepo {
        return $this->userRepoMock;
    }
}
