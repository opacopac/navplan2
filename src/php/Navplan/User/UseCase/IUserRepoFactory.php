<?php declare(strict_types=1);

namespace Navplan\User\UseCase;


interface IUserRepoFactory {
    function createUserPointSearch(): IUserPointSearch;
}
