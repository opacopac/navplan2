<?php namespace Navplan\User;
require_once __DIR__ . "/../NavplanHelper.php";

use Navplan\Shared\DbConnection;
use Navplan\Shared\DbException;
use Navplan\Shared\MailService;


class UserServiceProcessor
{
    /**
     * @param array|null $postVars
     * @param DbConnection $conn
     * @param MailService $mailService
     * @throws DbException
     */
    public static function processRequest(?array $postVars, DbConnection $conn, MailService $mailService)
    {
        switch ($postVars["action"]) {
            case "login":
                UserLogin::login($conn, $postVars);
                break;
            case "autologin":
                UserLogin::autoLogin($conn, $postVars);
                break;
            case "verifyemail":
                UserRegister::verifyEmail($conn, $postVars, $mailService);
                break;
            case "register":
                UserRegister::register($conn, $postVars);
                break;
            case "forgotpassword":
                UserForgotPw::forgotPassword($conn, $postVars, $mailService);
                break;
            case "updatepassword":
                UserUpdatePw::updatePassword($conn, $postVars);
                break;
            default:
                die("no or invalid action defined!");
        }
    }
}
