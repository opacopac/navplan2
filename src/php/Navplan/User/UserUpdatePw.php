<?php declare(strict_types=1);

namespace Navplan\User;

use Navplan\Message;
use Navplan\Shared\DbException;
use Navplan\Shared\IDbService;
use Navplan\Shared\IHttpResponseService;


class UserUpdatePw {
    /**
     * @param array $args
     * @param IDbService $dbService
     * @param IHttpResponseService $httpService
     * @return void
     * @throws DbException
     */
    public static function updatePassword(array $args, IDbService $dbService, IHttpResponseService $httpService): void {
        $dbService->openDb();

        $token = UserHelper::escapeTrimInput($dbService, $args["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($dbService, $token);

        $oldpassword = UserHelper::escapeTrimInput($dbService, $args["oldpassword"]);
        $newpassword = UserHelper::escapeTrimInput($dbService, $args["newpassword"]);

        if (!UserHelper::checkPwFormat($newpassword)) {
            UserHelper::sendErrorResponse($httpService, new Message(-1, 'error: invalid new password format'));
            return;
        }

        if (!$email || !UserHelper::checkEmailFormat($email) || !UserHelper::checkEmailExists($dbService, $email)) {
            UserHelper::sendErrorResponse($httpService, new Message(-2, 'error: invalid token'));
            return;
        }

        if (!UserHelper::checkPwFormat($oldpassword) || !UserHelper::verifyPwHash($dbService, $email, $oldpassword)) {
            UserHelper::sendErrorResponse($httpService, new Message(-3, 'error: invalid old password'));
            return;
        }

        // create new pw
        $newpw_hash = password_hash($newpassword, PASSWORD_BCRYPT);
        $query = "UPDATE users SET pw_hash='" . $newpw_hash . "' WHERE email='" . $email . "'";
        $dbService->execCUDQuery($query, "error updating password");

        $dbService->closeDb();

        UserHelper::sendSuccessResponse($httpService, $email, $token);
    }
}
