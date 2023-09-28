<?php declare(strict_types=1);

namespace Navplan\User\UseCase\Login;

use Navplan\User\UseCase\UserResponse;


interface ILoginUc {
    function login(LoginRequest $request): UserResponse;
}
