<?php declare(strict_types=1);

namespace Navplan\User\DomainService;


interface IUserRepoFactory {
    function createUserRepo(): IUserRepo;

    function createUserPointRepo(): IUserPointRepo;
}
