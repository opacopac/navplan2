<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Message;
use Navplan\NavplanHelper;
use Navplan\Shared\DbConnection;
use Navplan\Shared\DbException;
use Navplan\Shared\DbService;
use Navplan\Shared\IMailService;


class UserForgotPw
{
    /**
     * @param DbConnection $conn
     * @param array $args
     * @param IMailService $mailService
     * @return bool
     * @throws DbException
     */
    public static function sendLostPwEmail(DbConnection $conn, array $args, IMailService $mailService): bool
    {
        if (!$args["email"])
            return UserHelper::sendErrorResponse(new Message(-1, 'error: email missing'), $conn);

        $email = UserHelper::escapeTrimInput($conn, $args["email"]);

        if (!UserHelper::checkEmailFormat($email))
            return UserHelper::sendErrorResponse(new Message(-1, 'error: invalid email format'), $conn);

        if (!self::isExistingEMail($conn, $email))
            return UserHelper::sendErrorResponse(new Message(-2, 'error: email does not exist'), $conn);

        // send pw recovery email
        $token = UserHelper::createToken($email, false);
        self::sendPwRecoveryEmail($mailService, $email, $token);

        return UserHelper::sendSuccessResponse($email, '');
    }


    /**
     * @param DbConnection $conn
     * @param array $args
     * @return bool
     * @throws DbException
     */
    public static function resetPassword(DbConnection $conn, array $args): bool
    {
        if (!$args["token"])
            return UserHelper::sendErrorResponse(new Message(-2, 'error: token missing'), $conn);

        if (!$args["password"])
            return UserHelper::sendErrorResponse(new Message(-1, 'error: password missing'), $conn);

        $token = UserHelper::escapeTrimInput($conn, $args["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($conn, $token);
        $password = UserHelper::escapeTrimInput($conn, $args["password"]);
        $rememberMe = ($args["rememberme"] === "1");

        if (!UserHelper::checkPwFormat($password))
            return UserHelper::sendErrorResponse(new Message(-1, 'error: invalid password format'), $conn);

        if (!$email || !UserHelper::checkEmailFormat($email))
            return UserHelper::sendErrorResponse(new Message(-2, 'error: invalid token'), $conn);

        if (!self::isExistingEMail($conn, $email))
            return UserHelper::sendErrorResponse(new Message(-2, 'error: email does not exists'), $conn);

        self::updatePassword($conn, $email, $password);
        $token = UserHelper::createToken($email, $rememberMe);

        return UserHelper::sendSuccessResponse($email, $token);
    }


    /**
     * @param DbConnection $conn
     * @param string $email
     * @return bool
     * @throws DbException
     */
    private static function isExistingEMail(DbConnection $conn, string $email): bool
    {
        $query = "SELECT id FROM users WHERE email='" . $email . "'";
        $result = DbService::execSingleResultQuery($conn, $query, true, "error checking for existing email");

        return ($result->getNumRows() > 0);
    }


    /**
     * @param DbConnection $conn
     * @param string $email
     * @param string $password
     * @throws DbException
     */
    private static function updatePassword(DbConnection $conn, string $email, string $password)
    {
        $pw_hash = crypt($password);
        $query = "UPDATE users SET pw_hash='" . $pw_hash . "' WHERE email='" . $email . "'";
        DbService::execCUDQuery($conn, $query, "error updating password");
    }


    private static function sendPwRecoveryEmail(IMailService $mailService, string $email, string $token): bool
    {
        $resetPwUrl = NavplanHelper::NAVPLAN_BASE_URL . '/resetpw/' . $token;
        $subject = "Navplan.ch - Reset Password";
        $message = '
            <html>
            <head>
              <title>Navplan.ch - Reset Password</title>
            </head>
            <body>
              <p>Please click the following link to reset your password on Navplan.ch:</p>
              <p><a href="' . $resetPwUrl . '">Reset Password</a></p>
            </body>
            </html>';

        return $mailService->sendEmail($email, $subject, $message);
    }
}
