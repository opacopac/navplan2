<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbService;


class UserUpdatePw
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


    public static function updatePassword(array $input)
    {
        $conn = DbService::openDb();
        $email = UserHelper::escapeEmail($conn, $input); // TODO

        // get credentials
        $oldpassword = mysqli_real_escape_string($conn, trim($input["oldpassword"]));
        $newpassword = mysqli_real_escape_string($conn, trim($input["newpassword"]));

        if (!checkEmailFormat($email) || !checkPwFormat($oldpassword) || !checkPwFormat($newpassword))
        {
            $resultcode = -3;
            $message = "error: invalid format of email or password";
        }

        // find user
        $query = "SELECT id, pw_hash FROM users WHERE email='" . $email . "'";
        $result = DbService::execSingleResultQuery($conn, $query);

        if ($result->num_rows == 1)
        {
            $row = $result->fetch_assoc();
            $pw_hash_db = $row["pw_hash"];

            // compare pw hashes
            if ($pw_hash_db === crypt($oldpassword, $pw_hash_db))
            {
                // hash new pw
                $newpw_hash = crypt($newpassword);

                // save new pw
                $query = "UPDATE users SET pw_hash='" . $newpw_hash . "' WHERE email='" . $email . "'";
                DbService::execCUDQuery($conn, $query, "error updating password");

                $message = "password successfully changed";
                $resultcode = 0;
            }
            else
            {
                $message = "error: invalid password";
                $resultcode = -1;
            }
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

        // close db
        $conn->close();
    }
}
