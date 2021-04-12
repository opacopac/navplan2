<?php declare(strict_types=1);

namespace Navplan\User\RestModel;

use Navplan\User\UseCase\UserResponse;


class UserResponseConverter {
    public static function toRest(UserResponse $response): array {
        $responseArray = array(
            "resultcode" => $response->code,
            "message" => $response->message ? $response->message : ''
        );

        if ($response->email) {
            $responseArray["email"] = $response->email;
        }

        if ($response->token) {
            $responseArray["token"] = $response->token;
        }

        return $responseArray;
    }
}
