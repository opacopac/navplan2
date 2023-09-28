<?php declare(strict_types=1);

namespace Navplan\User\UseCase\SendLostPw;

use Navplan\User\UseCase\UserResponse;


interface ISendLostPwUc {
    public function sendLostPw(SendLostPwRequest $request): UserResponse;
}
