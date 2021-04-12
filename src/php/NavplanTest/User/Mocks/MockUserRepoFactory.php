<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\User\DomainService\IUserRepoFactory;


class MockUserRepoFactory implements IUserRepoFactory {
    private MockUserRepo $userRepoMock;
    private MockUserPointRepo $userPointRepoMock;


    public function __construct() {
        $this->userRepoMock = new MockUserRepo();
        $this->userPointRepoMock = new MockUserPointRepo();
    }


    public function createUserPointRepo(): MockUserPointRepo {
        return $this->userPointRepoMock;
    }


    public function createUserRepo(): MockUserRepo {
        return $this->userRepoMock;
    }
}
