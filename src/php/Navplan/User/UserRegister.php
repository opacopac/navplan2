<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;
use Navplan\Shared\DbService;


class UserRegister
{
    const RESPONSE_MESSAGE_TEXTS = array(
        10 => 'login successful',
        11 => 'activation email sent',
        12 => 'registration successful',
        91 => 'error: invalid password',
        92 => 'error: invalid email',
        93 => 'error: invalid token',
        94 => 'error: invalid email format',
        95 => 'error: invalid password format',
        96 => 'error: email already exists'
    );


    public static function verifyEmail(array $input)
    {
        $conn = DbService::openDb();
        $email = UserHelper::escapeEmail($conn, $input);

        // check email format
        if (!checkEmailFormat($email))
        {
            UserHelper::sendResponse(94);
            $conn->close();
            exit;
        }

        // check duplicate email
        if (self::isDuplicateEmail($conn, $email))
        {
            UserHelper::sendResponse(96);
            $conn->close();
            exit;
        }

        // send activation email
        $token = UserHelper::createToken($email, false);
        self::sendActivationEmail($email, $token);

        UserHelper::sendResponse(11, $email);
        $conn->close();
    }


    public static function activate(array $input)
    {
        $conn = DbService::openDb();
        $token = UserHelper::escapeToken($conn, $input);
        $email = UserHelper::getAuthenticatedEmailOrNull($token);
        $password = UserHelper::escapePassword($conn, $input);
        $rememberMe = UserHelper::escapeRememberMe($input);

        // check pw format
        if (!checkPwFormat($password))
        {
            UserHelper::sendResponse(95);
            $conn->close();
            exit;
        }

        // verify token
        if (!$email) {
            UserHelper::sendResponse(93);
            $conn->close();
            exit;
        }

        // create new user & token
        self::createUser($conn, $email, $password);
        $token = UserHelper::createToken($email, $rememberMe);

        UserHelper::sendResponse(12, $email, $token);
        $conn->close();
    }


    private static function isDuplicateEmail(mysqli $conn, string $email): bool {
        $query = "SELECT id FROM users WHERE email='" . $email . "'";
        $result = $conn->query($query);

        if ($result === FALSE)
            die("error checking for duplicate user: " . $conn->error . " query:" . $query);

        return ($result->num_rows > 0);
    }


    private static function createUser(mysqli $conn, string $email, string $password): bool {
        $pw_hash = crypt($password);
        $query = "INSERT INTO users (token, email, pw_hash) VALUES ('DUMMY','" . $email . "','" . $pw_hash . "')";
        $result = $conn->query($query);

        if ($result === FALSE)
            die("error creating user: " . $conn->error . " query:" . $query);

        return true; // TODO
    }


    private static function sendActivationEmail(string $email, string $token): bool {
        $subject = "Welcome to Navplan.ch";
        $message = '
            <html>
            <head>
              <title>Welcome to Navplan.ch</title>
            </head>
            <body>
              <p>Welcome ' . $email . '!</p>
              <p>Please click on the link below to confirm your e-mail and activate your account:</p>
              <p><a href="http://www.navplan.ch/#/activate?email=' . $email . '&token=' . $token . '">Activate Account</a></p>
            </body>
            </html>';

        return UserHelper::sendEmail($email, $subject, $message);
    }
}
