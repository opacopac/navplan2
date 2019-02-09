<?php declare(strict_types=1);

namespace Navplan\User;

use Navplan\Message;
use Navplan\Shared\DbException;
use Navplan\Shared\IDbService;


class UserLogin
{
    /**
     * @param array $args
     * @param IDbService $dbService
     * @return bool
     */
    public static function autoLogin(array $args, IDbService $dbService): bool
    {
        $dbService->openDb();

        if (!$args["token"])
            return UserHelper::sendErrorResponse(new Message(-1, 'error: token is missing'));

        $token = UserHelper::escapeTrimInput($dbService, $args["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($dbService, $token);

        if (!$email)
            return UserHelper::sendErrorResponse(new Message(-1, 'error: invalid token'));

        $dbService->closeDb();

        return UserHelper::sendSuccessResponse($email, $token);
    }


    /**
     * @param array $args
     * @param IDbService $dbService
     * @return bool
     * @throws DbException
     */
    public static function login(array $args, IDbService $dbService): bool
    {
        $dbService->openDb();

        if (!$args["email"])
            return UserHelper::sendErrorResponse(new Message(-1, 'error: email missing'));

        if (!$args["password"])
            return UserHelper::sendErrorResponse(new Message(-2, 'error: password missing'));

        $email = UserHelper::escapeTrimInput($dbService, $args["email"]);
        $password = UserHelper::escapeTrimInput($dbService, $args["password"]);
        $rememberMe = ($args["rememberme"] === "1");

        if (!UserHelper::checkEmailFormat($email) || !UserHelper::checkEmailExists($dbService, $email))
            return UserHelper::sendErrorResponse(new Message(-1, 'error: invalid email'));

        if (!UserHelper::checkPwFormat($password) || !UserHelper::verifyPwHash($dbService, $email, $password))
            return UserHelper::sendErrorResponse(new Message(-2, 'error: invalid password'));

        // create new token
        $token = UserHelper::createToken($email, $rememberMe);

        $dbService->closeDb();

        return UserHelper::sendSuccessResponse($email, $token);
    }
}
