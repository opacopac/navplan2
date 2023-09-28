<?php declare(strict_types=1);

namespace Navplan\User\UseCase\SendLostPw;


class SendLostPwRequest {
    public function __construct(public string $email) {
    }
}
