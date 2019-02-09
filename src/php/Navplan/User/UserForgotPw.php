<?php declare(strict_types=1);

namespace Navplan\User;

use Navplan\Message;
use Navplan\NavplanHelper;
use Navplan\Shared\DbException;
use Navplan\Shared\IDbService;
use Navplan\Shared\IMailService;


class UserForgotPw {
    /**
     * @param array $args
     * @param IMailService $mailService
     * @param IDbService $dbService
     * @return bool
     */
    public static function sendLostPwEmail(array $args, IMailService $mailService, IDbService $dbService): bool
    {
        $dbService->openDb();

        if (!$args["email"])
            return UserHelper::sendErrorResponse(new Message(-1, 'error: email missing'));

        $email = UserHelper::escapeTrimInput($dbService, $args["email"]);

        if (!UserHelper::checkEmailFormat($email))
            return UserHelper::sendErrorResponse(new Message(-1, 'error: invalid email format'));

        if (!self::isExistingEMail($dbService, $email))
            return UserHelper::sendErrorResponse(new Message(-2, 'error: email does not exist'));

        // send pw recovery email
        $token = UserHelper::createToken($email, false);
        self::sendPwRecoveryEmail($mailService, $email, $token);

        $dbService->closeDb();

        return UserHelper::sendSuccessResponse($email, '');
    }


    /**
     * @param array $args
     * @param IDbService $dbService
     * @return bool
     * @throws DbException
     */
    public static function resetPassword(array $args, IDbService $dbService): bool {
        $dbService->openDb();

        if (!$args["token"])
            return UserHelper::sendErrorResponse(new Message(-2, 'error: token missing'));

        if (!$args["password"])
            return UserHelper::sendErrorResponse(new Message(-1, 'error: password missing'));

        $token = UserHelper::escapeTrimInput($dbService, $args["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($dbService, $token);
        $password = UserHelper::escapeTrimInput($dbService, $args["password"]);
        $rememberMe = ($args["rememberme"] === "1");

        if (!UserHelper::checkPwFormat($password))
            return UserHelper::sendErrorResponse(new Message(-1, 'error: invalid password format'));

        if (!$email || !UserHelper::checkEmailFormat($email))
            return UserHelper::sendErrorResponse(new Message(-2, 'error: invalid token'));

        if (!self::isExistingEMail($dbService, $email))
            return UserHelper::sendErrorResponse(new Message(-2, 'error: email does not exists'));

        self::updatePassword($dbService, $email, $password);
        $token = UserHelper::createToken($email, $rememberMe);

        $dbService->closeDb();

        return UserHelper::sendSuccessResponse($email, $token);
    }


    /**
     * @param IDbService $dbService
     * @param string $email
     * @return bool
     */
    private static function isExistingEMail(IDbService $dbService, string $email): bool {
        $query = "SELECT id FROM users WHERE email='" . $email . "'";
        $result = $dbService->execSingleResultQuery($query, true, "error checking for existing email");

        return ($result->getNumRows() > 0);
    }


    /**
     * @param IDbService $dbService
     * @param string $email
     * @param string $password
     */
    private static function updatePassword(IDbService $dbService, string $email, string $password) {
        $pw_hash = crypt($password);
        $query = "UPDATE users SET pw_hash='" . $pw_hash . "' WHERE email='" . $email . "'";
        $dbService->execCUDQuery($query, "error updating password");
    }


    private static function sendPwRecoveryEmail(IMailService $mailService, string $email, string $token): bool {
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
