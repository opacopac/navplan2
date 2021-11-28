<?php declare(strict_types=1);

namespace Navplan\User\RestService;

use InvalidArgumentException;
use Navplan\User\RestModel\AutoLoginRequestConverter;
use Navplan\User\RestModel\LoginRequestConverter;
use Navplan\User\RestModel\RegisterRequestConverter;
use Navplan\User\RestModel\ResetPwRequestConverter;
use Navplan\User\RestModel\SendLostPwRequestConverter;
use Navplan\User\RestModel\SendRegisterEmailRequestConverter;
use Navplan\User\RestModel\UpdatePwRequestConverter;
use Navplan\User\RestModel\UserResponseConverter;


class UserServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_LOGIN = "login";
    const ACTION_AUTOLOGIN = "autologin";
    const ACTION_SEND_REGISTER_MAIL = "sendregisteremail";
    const ACTION_REGISTER = "register";
    const ACTION_SEND_LOST_PW = "sendlostpwemail";
    const ACTION_RESET_PW = "resetpassword";
    const ACTION_UPDATE_PW = "updatepassword";


    public static function processRequest(IUserServiceDiContainer $diContainer) {
        $httpService = $diContainer->getHttpService();
        $postVars = $httpService->getPostArgs();
        $action = $postVars[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_LOGIN:
                $request = LoginRequestConverter::fromArgs($postVars);
                $response = $diContainer->getLoginUc()->login($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_AUTOLOGIN:
                $request = AutoLoginRequestConverter::fromArgs($postVars);
                $response = $diContainer->getAutoLoginUc()->autologin($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_SEND_REGISTER_MAIL:
                $request = SendRegisterEmailRequestConverter::fromArgs($postVars);
                $response = $diContainer->getSendRegisterEmailUc()->sendRegisterEmail($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_REGISTER:
                $request = RegisterRequestConverter::fromArgs($postVars);
                $response = $diContainer->getRegisterUc()->register($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_SEND_LOST_PW:
                $request = SendLostPwRequestConverter::fromArgs($postVars);
                $response = $diContainer->getSendLostPwUc()->sendLostPw($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_RESET_PW:
                $request = ResetPwRequestConverter::fromArgs($postVars);
                $response = $diContainer->getResetPwUc()->resetPassword($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_UPDATE_PW:
                $request = UpdatePwRequestConverter::fromArgs($postVars);
                $response = $diContainer->getUpdatePwUc()->updatePassword($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            default:
                throw new InvalidArgumentException("no or invalid action defined!");
        }
    }
}
