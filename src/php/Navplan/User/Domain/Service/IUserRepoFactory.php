<?php declare(strict_types=1);

namespace Navplan\User\Domain\Service;


interface IUserRepoFactory {
    function createUserRepo(): IUserRepo;

    function createUserPointRepo(): IUserPointRepo;
}
