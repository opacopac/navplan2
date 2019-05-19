<?php declare(strict_types=1);

namespace Navplan\User;

use InvalidArgumentException;
use Navplan\Shared\DbException;
use Navplan\Shared\IDbService;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\IMailService;


class UserServiceProcessor {
    /**
     * @param array|null $postVars
     * @param IMailService $mailService
     * @param IDbService $dbService
     * @throws DbException
     * @throws InvalidArgumentException
     */
    public static function processRequest(?array $postVars, IMailService $mailService, IDbService $dbService, IHttpResponseService $httpService) {
        $action = isset($postVars["action"]) ? $postVars["action"] : NULL;
        switch ($action) {
            case "login":
                UserLogin::login($postVars, $dbService, $httpService);
                break;
            case "autologin":
                UserLogin::autoLogin($postVars, $dbService, $httpService);
                break;
            case "sendregisteremail":
                UserRegister::sendRegisterEmail($postVars, $dbService, $httpService, $mailService);
                break;
            case "register":
                UserRegister::register($postVars, $dbService, $httpService);
                break;
            case "sendlostpwemail":
                UserForgotPw::sendLostPwEmail($postVars, $dbService, $httpService, $mailService);
                break;
            case "resetpassword":
                UserForgotPw::resetPassword($postVars, $dbService, $httpService);
                break;
            case "updatepassword":
                UserUpdatePw::updatePassword($postVars, $dbService, $httpService);
                break;
            default:
                throw new InvalidArgumentException("no or invalid action defined!");
        }
    }
}
