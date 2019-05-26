<?php declare(strict_types=1);

namespace Navplan\User;

use Navplan\Message;
use Navplan\NavplanHelper;
use Navplan\Shared\DbException;
use Navplan\Shared\IDbService;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\IMailService;
use Navplan\Shared\StringNumberService;


class UserRegister {
    /**
     * @param array $args
     * @param IDbService $dbService
     * @param IHttpResponseService $httpService
     * @param IMailService $mailService
     * @return void
     */
    public static function sendRegisterEmail(array $args, IDbService $dbService, IHttpResponseService $httpService, IMailService $mailService): void {
        $dbService->openDb();

        $email = UserHelper::escapeTrimInput($dbService, $args["email"]);

        if (!UserHelper::checkEmailFormat($email)) {
            UserHelper::sendErrorResponse($httpService, new Message(-1, 'error: invalid email format'));
            return;
        }

        if (self::isDuplicateEmail($dbService, $email)) {
            UserHelper::sendErrorResponse($httpService, new Message(-2, 'error: email already exists'));
            return;
        }

        // send activation email
        $token = UserHelper::createToken($email, false);
        self::sendActivationEmail($mailService, $email, $token);

        $dbService->closeDb();

        UserHelper::sendSuccessResponse($httpService, $email, '');
    }


    /**
     * @param array $args
     * @param IDbService $dbService
     * @param IHttpResponseService $httpService
     * @return void
     * @throws DbException
     */
    public static function register(array $args, IDbService $dbService, IHttpResponseService $httpService): void {
        $dbService->openDb();

        $token = UserHelper::escapeTrimInput($dbService, $args["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($dbService, $token);
        $password = UserHelper::escapeTrimInput($dbService, $args["password"]);
        $rememberMe = (StringNumberService::parseStringOrNull($args, "rememberme") === "1");

        if (!UserHelper::checkPwFormat($password)) {
            UserHelper::sendErrorResponse($httpService, new Message(-1, 'error: invalid password format'));
            return;
        }

        if (!$email || !UserHelper::checkEmailFormat($email)) {
            UserHelper::sendErrorResponse($httpService, new Message(-2, 'error: invalid token'));
            return;
        }

        if (self::isDuplicateEmail($dbService, $email)) {
            UserHelper::sendErrorResponse($httpService, new Message(-3, 'error: email already exists'));
            return;
        }

        // create new user & token
        self::createUser($dbService, $email, $password);
        $token = UserHelper::createToken($email, $rememberMe);

        $dbService->closeDb();

        UserHelper::sendSuccessResponse($httpService, $email, $token);
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
        $pw_hash = password_hash($password, PASSWORD_BCRYPT);
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
