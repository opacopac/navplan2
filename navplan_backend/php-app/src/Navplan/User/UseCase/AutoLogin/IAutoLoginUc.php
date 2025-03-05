<?php declare(strict_types=1);

namespace Navplan\User\UseCase\AutoLogin;

use Navplan\User\UseCase\UserResponse;


interface IAutoLoginUc {
    function autologin(string $token): UserResponse;
}
