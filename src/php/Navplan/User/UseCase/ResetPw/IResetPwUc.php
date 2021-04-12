<?php declare(strict_types=1);

namespace Navplan\User\UseCase\ResetPw;

use Navplan\User\UseCase\UserResponse;


interface IResetPwUc {
    function resetPassword(ResetPwRequest $request): UserResponse;
}
