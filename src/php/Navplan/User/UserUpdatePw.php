<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Message;
use Navplan\Shared\DbConnection;
use Navplan\Shared\DbException;
use Navplan\Shared\DbService;


class UserUpdatePw
{
    /**
     * @param DbConnection $conn
     * @param array $args
     * @return bool
     * @throws DbException
     */
    public static function updatePassword(DbConnection $conn, array $args): bool
    {
        $token = UserHelper::escapeTrimInput($conn, $args["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($conn, $token);
        $oldpassword = UserHelper::escapeTrimInput($conn, $args["oldpassword"]);
        $newpassword = UserHelper::escapeTrimInput($conn, $args["newpassword"]);

        if (!UserHelper::checkPwFormat($newpassword))
            return UserHelper::sendErrorResponse(new Message(-1, 'error: invalid new password format'), $conn);

        if (!$email || !UserHelper::checkEmailFormat($email) || !UserHelper::checkEmailExists($conn, $email))
            return UserHelper::sendErrorResponse(new Message(-2, 'error: invalid token'), $conn);

        if (!UserHelper::checkPwFormat($oldpassword) || !UserHelper::verifyPwHash($conn, $email, $oldpassword))
            return UserHelper::sendErrorResponse(new Message(-3, 'error: invalid old password'), $conn);

        // create new pw
        $newpw_hash = crypt($newpassword);
        $query = "UPDATE users SET pw_hash='" . $newpw_hash . "' WHERE email='" . $email . "'";
        DbService::execCUDQuery($conn, $query, "error updating password");

        return UserHelper::sendSuccessResponse($email, $token);
    }
}
