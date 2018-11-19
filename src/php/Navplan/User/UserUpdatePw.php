<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Message;
use Navplan\Shared\DbService;


class UserUpdatePw
{
    public static function updatePassword(array $input)
    {
        $conn = DbService::openDb();
        $token = UserHelper::escapeTrimInput($conn, $input["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($conn, $token);
        $oldpassword = UserHelper::escapeTrimInput($conn, $input["oldpassword"]);
        $newpassword = UserHelper::escapeTrimInput($conn, $input["newpassword"]);

        if (!UserHelper::checkPwFormat($newpassword))
            UserHelper::sendErrorResponseAndDie(new Message(-1, 'error: invalid new password format'), $conn);

        if (!$email || !UserHelper::checkEmailFormat($email) || !UserHelper::checkEmailExists($conn, $email))
            UserHelper::sendErrorResponseAndDie(new Message(-2, 'error: invalid token'), $conn);

        if (!UserHelper::checkPwFormat($oldpassword) || !UserHelper::verifyPwHash($conn, $email, $oldpassword))
            UserHelper::sendErrorResponseAndDie(new Message(-3, 'error: invalid old password'), $conn);

        // create new pw
        $newpw_hash = crypt($newpassword);
        $query = "UPDATE users SET pw_hash='" . $newpw_hash . "' WHERE email='" . $email . "'";
        DbService::execCUDQuery($conn, $query, "error updating password");

        UserHelper::sendSuccessResponse($email, $token);
        $conn->close();
    }
}
