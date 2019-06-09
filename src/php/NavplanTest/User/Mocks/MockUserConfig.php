<?php declare(strict_types=1);

namespace NavplanTest\User\Mocks;

use Navplan\System\UseCase\ISystemServiceFactory;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\IUserRepoFactory;
use NavplanTest\System\Mock\MockSystemServiceFactory;


class MockUserConfig implements IUserConfig {
    private $systemServiceFactory;
    private $userRepoFactory;


    public function __construct() {
        $this->systemServiceFactory = new MockSystemServiceFactory();
        $this->userRepoFactory = new MockUserRepoFactory();
    }


    public function getSystemServiceFactory(): ISystemServiceFactory {
        return $this->systemServiceFactory;
    }


    public function getUserRepoFactory(): IUserRepoFactory {
        return $this->userRepoFactory;
    }
}
