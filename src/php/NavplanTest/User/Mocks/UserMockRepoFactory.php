<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\User\IRepo\IUserPointSearch;
use Navplan\User\IRepo\IUserRepoFactory;


class UserMockRepoFactory implements IUserRepoFactory {
    private $userPointRepoMock;


    public function __construct() {
        $this->userPointRepoMock = new UserPointSearchMock();
    }


    public function createUserPointSearch(): IUserPointSearch {
        return $this->userPointRepoMock;
    }

}
