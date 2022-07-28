<?php declare(strict_types=1);

namespace Navplan\User\RestService;

use InvalidArgumentException;
use Navplan\System\DomainService\IHttpService;
use Navplan\User\RestModel\AutoLoginRequestConverter;
use Navplan\User\RestModel\LoginRequestConverter;
use Navplan\User\RestModel\RegisterRequestConverter;
use Navplan\User\RestModel\ResetPwRequestConverter;
use Navplan\User\RestModel\SendLostPwRequestConverter;
use Navplan\User\RestModel\SendRegisterEmailRequestConverter;
use Navplan\User\RestModel\UpdatePwRequestConverter;
use Navplan\User\RestModel\UserResponseConverter;
use Navplan\User\UseCase\AutoLogin\IAutoLoginUc;
use Navplan\User\UseCase\Login\ILoginUc;
use Navplan\User\UseCase\Register\IRegisterUc;
use Navplan\User\UseCase\ResetPw\IResetPwUc;
use Navplan\User\UseCase\SendLostPw\ISendLostPwUc;
use Navplan\User\UseCase\SendRegisterEmail\ISendRegisterEmailUc;
use Navplan\User\UseCase\UpdatePw\IUpdatePwUc;


class UserServiceController {
    const ARG_ACTION = "action";
    const ACTION_LOGIN = "login";
    const ACTION_AUTOLOGIN = "autologin";
    const ACTION_SEND_REGISTER_MAIL = "sendregisteremail";
    const ACTION_REGISTER = "register";
    const ACTION_SEND_LOST_PW = "sendlostpwemail";
    const ACTION_RESET_PW = "resetpassword";
    const ACTION_UPDATE_PW = "updatepassword";


    public static function processRequest(
        ILoginUc $loginUc,
        IAutoLoginUc $autoLoginUc,
        ISendRegisterEmailUc $sendRegisterEmailUc,
        IRegisterUc $registerUc,
        ISendLostPwUc $sendLostPwUc,
        IResetPwUc $resetPwUc,
        IUpdatePwUc $updatePwUc,
        IHttpService $httpService
    ) {
        $postVars = $httpService->getPostArgs();
        $action = $postVars[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_LOGIN:
                $request = LoginRequestConverter::fromArgs($postVars);
                $response = $loginUc->login($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_AUTOLOGIN:
                $request = AutoLoginRequestConverter::fromArgs($postVars);
                $response = $autoLoginUc->autologin($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_SEND_REGISTER_MAIL:
                $request = SendRegisterEmailRequestConverter::fromArgs($postVars);
                $response = $sendRegisterEmailUc->sendRegisterEmail($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_REGISTER:
                $request = RegisterRequestConverter::fromArgs($postVars);
                $response = $registerUc->register($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_SEND_LOST_PW:
                $request = SendLostPwRequestConverter::fromArgs($postVars);
                $response = $sendLostPwUc->sendLostPw($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_RESET_PW:
                $request = ResetPwRequestConverter::fromArgs($postVars);
                $response = $resetPwUc->resetPassword($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_UPDATE_PW:
                $request = UpdatePwRequestConverter::fromArgs($postVars);
                $response = $updatePwUc->updatePassword($request);
                $httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            default:
                throw new InvalidArgumentException("no or invalid action defined!");
        }
    }
}
