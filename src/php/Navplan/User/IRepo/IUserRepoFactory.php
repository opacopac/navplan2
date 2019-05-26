<?php declare(strict_types=1);

namespace Navplan\User\IRepo;


interface IUserRepoFactory {
    function createUserPointRepo(): IUserPointRepo;
}
