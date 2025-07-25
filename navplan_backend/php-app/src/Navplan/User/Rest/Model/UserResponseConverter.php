<?php declare(strict_types=1);

namespace Navplan\User\Rest\Model;

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

        $responseArray["is_moderator"] = $response->isModerator;

        return $responseArray;
    }
}
