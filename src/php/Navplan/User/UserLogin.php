<?php declare(strict_types=1);

namespace Navplan\User;

use Navplan\Message;
use Navplan\Shared\DbException;
use Navplan\Shared\IDbService;


class UserLogin
{
    public static function autoLogin(array $args, IDbService $dbService): void
    {
        $dbService->openDb();

        if (!$args["token"]) {
            UserHelper::sendErrorResponse(new Message(-1, 'error: token is missing'));
            return;
        }

        $token = UserHelper::escapeTrimInput($dbService, $args["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($dbService, $token);

        if (!$email) {
            UserHelper::sendErrorResponse(new Message(-1, 'error: invalid token'));
            return;
        }

        $dbService->closeDb();

        UserHelper::sendSuccessResponse($email, $token);
    }


    public static function login(array $args, IDbService $dbService): void
    {
        $dbService->openDb();

        if (!$args["email"]) {
            UserHelper::sendErrorResponse(new Message(-1, 'error: email missing'));
            return;
        }

        if (!$args["password"]) {
            UserHelper::sendErrorResponse(new Message(-2, 'error: password missing'));
            return;
        }

        $email = UserHelper::escapeTrimInput($dbService, $args["email"]);
        $password = UserHelper::escapeTrimInput($dbService, $args["password"]);
        $rememberMe = ($args["rememberme"] === "1");

        if (!UserHelper::checkEmailFormat($email) || !UserHelper::checkEmailExists($dbService, $email)) {
            UserHelper::sendErrorResponse(new Message(-1, 'error: invalid email'));
            return;
        }

        if (!UserHelper::checkPwFormat($password) || !UserHelper::verifyPwHash($dbService, $email, $password)) {
            UserHelper::sendErrorResponse(new Message(-2, 'error: invalid password'));
            return;
        }

        // create new token
        $token = UserHelper::createToken($email, $rememberMe);

        $dbService->closeDb();

        UserHelper::sendSuccessResponse($email, $token);
    }
}
