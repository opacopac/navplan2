<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;
use Navplan\Message;
use Navplan\Shared\DbService;


class UserRegister
{
    public static function verifyEmail(array $input)
    {
        $conn = DbService::openDb();
        $email = UserHelper::escapeEmail($conn, $input);

        // check email format
        if (!UserHelper::checkEmailFormat($email))
        {
            UserHelper::sendErrorResponse(new Message(-1, 'error: invalid email format'));
            $conn->close();
            exit;
        }

        // check duplicate email
        if (self::isDuplicateEmail($conn, $email))
        {
            UserHelper::sendErrorResponse(new Message(-2, 'error: email already exists'));
            $conn->close();
            exit;
        }

        // send activation email
        $token = UserHelper::createToken($email, false);
        self::sendActivationEmail($email, $token);

        UserHelper::sendSuccessResponse($email, $token);
        $conn->close();
    }


    public static function register(array $input)
    {
        $conn = DbService::openDb();
        $token = UserHelper::escapeToken($conn, $input);
        $email = UserHelper::getAuthenticatedEmailOrNull($token);
        $password = UserHelper::escapePassword($conn, $input);
        $rememberMe = UserHelper::escapeRememberMe($input);

        // check pw format
        if (!UserHelper::checkPwFormat($password))
        {
            UserHelper::sendErrorResponse(new Message(-1, 'error: invalid password format'));
            $conn->close();
            exit;
        }

        // check email format
        if (!UserHelper::checkEmailFormat($email))
        {
            UserHelper::sendErrorResponse(new Message(-2, 'error: invalid email format'));
            $conn->close();
            exit;
        }

        // check duplicate email
        if (self::isDuplicateEmail($conn, $email))
        {
            UserHelper::sendErrorResponse(new Message(-3, 'error: email already exists'));
            $conn->close();
            exit;
        }

        // verify token
        if (!$email) {
            UserHelper::sendErrorResponse(new Message(-4, 'error: invalid token'));
            $conn->close();
            exit;
        }

        // create new user & token
        self::createUser($conn, $email, $password);
        $token = UserHelper::createToken($email, $rememberMe);

        UserHelper::sendSuccessResponse($email, $token);
        $conn->close();
    }


    private static function isDuplicateEmail(mysqli $conn, string $email): bool {
        $query = "SELECT id FROM users WHERE email='" . $email . "'";
        $result = $conn->query($query);

        if ($result === FALSE)
            die("error checking for duplicate user: " . $conn->error . " query:" . $query);

        return ($result->num_rows > 0);
    }


    private static function sendActivationEmail(string $email, string $token): bool {
        $subject = "Welcome to Navplan.ch";
        $message = '
            <html>
            <head>
              <title>Welcome to Navplan.ch</title>
            </head>
            <body>
              <p>Welcome to Navplan.ch!</p>
              <p>Please click the following link to confirm your email address and create your account on Navplan.ch:</p>
              <p><a href="http://www.navplan.ch/#/register/' . $token . '">Create Account</a></p>
            </body>
            </html>';

        return UserHelper::sendEmail($email, $subject, $message);
    }


    private static function createUser(mysqli $conn, string $email, string $password) {
        $pw_hash = crypt($password);
        $query = "INSERT INTO users (token, email, pw_hash) VALUES ('DUMMY','" . $email . "','" . $pw_hash . "')";
        $result = $conn->query($query);

        if ($result === FALSE)
            die("error creating user: " . $conn->error . " query:" . $query);
    }
}
