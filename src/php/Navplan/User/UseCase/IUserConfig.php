<?php declare(strict_types=1);

namespace Navplan\User\UseCase;

use Navplan\System\UseCase\ISystemServiceFactory;


interface IUserConfig {
    function getSystemServiceFactory(): ISystemServiceFactory;

    function getUserRepoFactory(): IUserRepoFactory;
}
