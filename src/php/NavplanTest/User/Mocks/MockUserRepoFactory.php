<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\User\UseCase\IUserPointRepo;
use Navplan\User\UseCase\IUserRepo;
use Navplan\User\UseCase\IUserRepoFactory;


class MockUserRepoFactory implements IUserRepoFactory {
    private $userRepoMock;
    private $userPointRepoMock;


    public function __construct() {
        $this->userRepoMock = new MockUserRepo();
        $this->userPointRepoMock = new MockUserPointRepo();
    }


    public function createUserPointRepo(): IUserPointRepo {
        return $this->userPointRepoMock;
    }


    public function createUserRepo(): IUserRepo {
        return $this->userRepoMock;
    }
}
