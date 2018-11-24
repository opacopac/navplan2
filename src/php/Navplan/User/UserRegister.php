<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Message;
use Navplan\NavplanHelper;
use Navplan\Shared\DbConnection;
use Navplan\Shared\DbException;
use Navplan\Shared\DbService;
use Navplan\Shared\MailService;


class UserRegister
{
    /**
     * @param DbConnection $conn
     * @param array $args
     * @param MailService $mailService
     * @throws DbException
     */
    public static function verifyEmail(DbConnection $conn, array $args, MailService $mailService)
    {
        $email = UserHelper::escapeTrimInput($conn, $args["email"]);

        if (!UserHelper::checkEmailFormat($email))
            UserHelper::sendErrorResponseAndDie(new Message(-1, 'error: invalid email format'), $conn);

        if (self::isDuplicateEmail($conn, $email))
            UserHelper::sendErrorResponseAndDie(new Message(-2, 'error: email already exists'), $conn);

        // send activation email
        $token = UserHelper::createToken($email, false);
        self::sendActivationEmail($mailService, $email, $token);

        UserHelper::sendSuccessResponse($email, $token);
    }


    /**
     * @param DbConnection $conn
     * @param array $args
     * @throws DbException
     */
    public static function register(DbConnection $conn, array $args)
    {
        $token = UserHelper::escapeTrimInput($conn, $args["token"]);
        $email = UserHelper::escapeAuthenticatedEmailOrNull($conn, $token);
        $password = UserHelper::escapeTrimInput($conn, $args["password"]);
        $rememberMe = ($args["rememberme"] === "1");

        if (!UserHelper::checkPwFormat($password))
            UserHelper::sendErrorResponseAndDie(new Message(-1, 'error: invalid password format'), $conn);

        if (!$email || !UserHelper::checkEmailFormat($email))
            UserHelper::sendErrorResponseAndDie(new Message(-2, 'error: invalid token'), $conn);

        if (self::isDuplicateEmail($conn, $email))
            UserHelper::sendErrorResponseAndDie(new Message(-3, 'error: email already exists'), $conn);

        // create new user & token
        self::createUser($conn, $email, $password);
        $token = UserHelper::createToken($email, $rememberMe);

        UserHelper::sendSuccessResponse($email, $token);
    }


    /**
     * @param DbConnection $conn
     * @param string $email
     * @return bool
     * @throws DbException
     */
    private static function isDuplicateEmail(DbConnection $conn, string $email): bool
    {
        $query = "SELECT id FROM users WHERE email='" . $email . "'";
        $result = DbService::execSingleResultQuery($conn, $query, true, "error checking for duplicate user");

        return ($result->getNumRows() > 0);
    }


    /**
     * @param DbConnection $conn
     * @param string $email
     * @param string $password
     * @throws DbException
     */
    private static function createUser(DbConnection $conn, string $email, string $password)
    {
        $pw_hash = crypt($password);
        $query = "INSERT INTO users (token, email, pw_hash) VALUES ('DUMMY','" . $email . "','" . $pw_hash . "')";
        DbService::execCUDQuery($conn, $query, "error creating user");
    }


    private static function sendActivationEmail(MailService $mailService, string $email, string $token): bool
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
