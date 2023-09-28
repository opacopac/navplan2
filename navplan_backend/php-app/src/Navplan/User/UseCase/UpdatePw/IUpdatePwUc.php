<?php declare(strict_types=1);

namespace Navplan\User\UseCase\UpdatePw;

use Navplan\User\UseCase\UserResponse;


interface IUpdatePwUc {
    function updatePassword(UpdatePwRequest $request): UserResponse;
}
