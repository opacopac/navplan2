<?php declare(strict_types=1);

namespace Navplan\User;

use InvalidArgumentException;
use Navplan\Shared\DbException;
use Navplan\Shared\IDbService;
use Navplan\Shared\IMailService;


class UserServiceProcessor {
    /**
     * @param array|null $postVars
     * @param IMailService $mailService
     * @param IDbService $dbService
     * @throws DbException
     * @throws InvalidArgumentException
     */
    public static function processRequest(?array $postVars, IMailService $mailService, IDbService $dbService) {
        switch ($postVars["action"]) {
            case "login":
                UserLogin::login($postVars, $dbService);
                break;
            case "autologin":
                UserLogin::autoLogin($postVars, $dbService);
                break;
            case "sendregisteremail":
                UserRegister::sendRegisterEmail($dbService, $postVars, $mailService);
                break;
            case "register":
                UserRegister::register($dbService, $postVars);
                break;
            case "sendlostpwemail":
                UserForgotPw::sendLostPwEmail($postVars, $mailService, $dbService);
                break;
            case "resetpassword":
                UserForgotPw::resetPassword($postVars, $dbService);
                break;
            case "updatepassword":
                UserUpdatePw::updatePassword($dbService, $postVars);
                break;
            default:
                throw new InvalidArgumentException("no or invalid action defined!");
        }
    }
}
