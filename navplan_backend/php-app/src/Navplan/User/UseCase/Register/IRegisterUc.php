<?php declare(strict_types=1);

namespace Navplan\User\UseCase\Register;

use Navplan\User\UseCase\UserResponse;


interface IRegisterUc {
    function register(RegisterRequest $request): UserResponse;
}
