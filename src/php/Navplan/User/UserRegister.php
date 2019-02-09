<?php declare(strict_types=1);

namespace Navplan\User;

use Navplan\Message;
use Navplan\NavplanHelper;
use Navplan\Shared\DbException;
use Navplan\Shared\IDbService;
use Navplan\Shared\IMailService;


class UserRegister {
    /**
     * @param IDbService $dbService
     * @param array $args
     * @param IMailService $mailService
     * @return bool
     */
    public static function sendRegisterEmail(IDbService $dbService, array $args, IMailService $mailService): void {
        $dbService->openDb();

        $email = UserHelper::escapeTrimInput($dbService, $args["email"]);

        if (!UserHelper::checkEmailFormat($email)) {
            UserHelper::sendErrorResponse(new Message(-1, 'error: invalid email format'));
            return;
        }

        if (self::isDuplicateEmail($dbService, $email)) {
            UserHelper::sendErrorResponse(new Message(-2, 'error: email already exists'));
            return;
        }

        // send activation email
        $token = UserHelper::createToken($email, false);
        self::sendActivationEmail($mailService, $email, $token);

        $dbService->closeDb();

        UserHelper::sendSuccessResponse($email, '');
    }


    /**
     * @param IDbService $dbService
     * @param array $args
     * @return bool
     * @throws DbException
     */
    public static function register(IDbService $dbService, array $args): void {
        $dbService->openDb();

        $token = UserHelper::escapeTrimInput($dbService, $args["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($dbService, $token);
        $password = UserHelper::escapeTrimInput($dbService, $args["password"]);
        $rememberMe = ($args["rememberme"] === "1");

        if (!UserHelper::checkPwFormat($password)) {
            UserHelper::sendErrorResponse(new Message(-1, 'error: invalid password format'));
            return;
        }

        if (!$email || !UserHelper::checkEmailFormat($email)) {
            UserHelper::sendErrorResponse(new Message(-2, 'error: invalid token'));
            return;
        }

        if (self::isDuplicateEmail($dbService, $email)) {
            UserHelper::sendErrorResponse(new Message(-3, 'error: email already exists'));
            return;
        }

        // create new user & token
        self::createUser($dbService, $email, $password);
        $token = UserHelper::createToken($email, $rememberMe);

        $dbService->closeDb();

        UserHelper::sendSuccessResponse($email, $token);
    }


    private static function isDuplicateEmail(IDbService $dbService, string $email): bool
    {
        $query = "SELECT id FROM users WHERE email='" . $email . "'";
        $result = $dbService->execSingleResultQuery($query, true, "error checking for duplicate user");

        return ($result->getNumRows() > 0);
    }


    /**
     * @param IDbService $dbService
     * @param string $email
     * @param string $password
     * @throws DbException
     */
    private static function createUser(IDbService $dbService, string $email, string $password)
    {
        $pw_hash = crypt($password);
        $query = "INSERT INTO users (token, email, pw_hash) VALUES ('DUMMY','" . $email . "','" . $pw_hash . "')";
        $dbService->execCUDQuery($query, "error creating user");
    }


    private static function sendActivationEmail(IMailService $mailService, string $email, string $token): bool
    {
        $activateUrl = NavplanHelper::NAVPLAN_BASE_URL . '/register/' . $token;
        $subject = "Welcome to Navplan.ch";
        $message = '
            <html>
            <head>
              <title>Welcome to Navplan.ch</title>
            </head>
            <body>
              <p>Welcome to Navplan.ch!</p>
              <p>Please click the following link to confirm your email address and create your account on Navplan.ch:</p>
              <p><a href="' . $activateUrl . '">Create Account</a></p>
            </body>
            </html>';

        return $mailService->sendEmail($email, $subject, $message);
    }
}
