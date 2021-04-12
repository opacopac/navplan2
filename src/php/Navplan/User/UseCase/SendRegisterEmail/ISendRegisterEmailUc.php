<?php declare(strict_types=1);

namespace Navplan\User\UseCase\SendRegisterEmail;

use Navplan\User\UseCase\UserResponse;


interface ISendRegisterEmailUc {
    function sendRegisterEmail(SendRegisterEmailRequest $request): UserResponse;
}
