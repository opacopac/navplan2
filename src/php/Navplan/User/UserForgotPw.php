<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use mysqli;
use Navplan\NavplanHelper;
use Navplan\Shared\DbService;
use Navplan\Shared\MailService;


class UserForgotPw
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


    // TODO
    public static function forgotPassword(mysqli $conn, array $args, MailService $mailService)
    {
        $email = UserHelper::escapeEmail($conn, $args);

        if (!UserHelper::checkEmailFormat($email))
        {
            $resultcode = -3;
            $message = "error: invalid email format";
        }


        // check if email exists
        $query = "SELECT id FROM users WHERE email='" . $email . "'";
        $result = DbService::execSingleResultQuery($conn, $query);

        if ($result->num_rows == 1)
        {
            $row = $result->fetch_assoc();

            // generate random pw
            $password = generateRandomPw(8);

            // hash pw
            $pw_hash = crypt($password);

            // save hashed pw
            $query = "UPDATE users SET pw_hash='" . $pw_hash . "' WHERE email='" . $email . "'";
            $result = $conn->query($query);

            if ($result === FALSE)
                die("error updating password: " . $conn->error . " query:" . $query);

            // send email with pw
            if (!self::sendPwResetEmail($mailService, $email, $password))

            $message = "email sent successfully";
            $resultcode = 0;
        }
        else
        {
            $message = "error: invalid email";
            $resultcode = -2;
        }

        // output result
        echo json_encode(
            array(
                "resultcode" => $resultcode,
                "message" => $message
            )
        );
    }


    private static function sendPwResetEmail(MailService $mailService, string $email, string $password): bool {
        $loginUrl = NavplanHelper::NAVPLAN_BASE_URL . '/login';
        $subject = "Navplan.ch - Password Reset";
        $message = '
            <html>
            <head>
              <title>Navplan.ch - Password Reset</title>
            </head>
            <body>
              <p>Your new password is: ' . $password . '</p>
              <p><a href="' . $loginUrl . '">Open Login Page</a></p>
            </body>
            </html>';

        return $mailService->sendEmail($email, $subject, $message);
    }
}
