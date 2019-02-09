<?php declare(strict_types=1);

namespace Navplan\User;

use Navplan\Message;
use Navplan\Shared\DbException;
use Navplan\Shared\IDbService;


class UserUpdatePw {
    /**
     * @param IDbService $dbService
     * @param array $args
     * @return bool
     * @throws DbException
     */
    public static function updatePassword(IDbService $dbService, array $args): bool {
        $dbService->openDb();

        $token = UserHelper::escapeTrimInput($dbService, $args["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($dbService, $token);

        $oldpassword = UserHelper::escapeTrimInput($dbService, $args["oldpassword"]);
        $newpassword = UserHelper::escapeTrimInput($dbService, $args["newpassword"]);

        if (!UserHelper::checkPwFormat($newpassword))
            return UserHelper::sendErrorResponse(new Message(-1, 'error: invalid new password format'));

        if (!$email || !UserHelper::checkEmailFormat($email) || !UserHelper::checkEmailExists($dbService, $email))
            return UserHelper::sendErrorResponse(new Message(-2, 'error: invalid token'));

        if (!UserHelper::checkPwFormat($oldpassword) || !UserHelper::verifyPwHash($dbService, $email, $oldpassword))
            return UserHelper::sendErrorResponse(new Message(-3, 'error: invalid old password'));

        // create new pw
        $newpw_hash = crypt($newpassword);
        $query = "UPDATE users SET pw_hash='" . $newpw_hash . "' WHERE email='" . $email . "'";
        $dbService->execCUDQuery($query, "error updating password");

        $dbService->closeDb();

        return UserHelper::sendSuccessResponse($email, $token);
    }
}
