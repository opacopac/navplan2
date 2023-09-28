<?php declare(strict_types=1);

namespace Navplan\User\Rest\Service;

use InvalidArgumentException;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\User\Rest\Model\AutoLoginRequestConverter;
use Navplan\User\Rest\Model\LoginRequestConverter;
use Navplan\User\Rest\Model\RegisterRequestConverter;
use Navplan\User\Rest\Model\ResetPwRequestConverter;
use Navplan\User\Rest\Model\SendLostPwRequestConverter;
use Navplan\User\Rest\Model\SendRegisterEmailRequestConverter;
use Navplan\User\Rest\Model\UpdatePwRequestConverter;
use Navplan\User\Rest\Model\UserResponseConverter;
use Navplan\User\UseCase\AutoLogin\IAutoLoginUc;
use Navplan\User\UseCase\Login\ILoginUc;
use Navplan\User\UseCase\Register\IRegisterUc;
use Navplan\User\UseCase\ResetPw\IResetPwUc;
use Navplan\User\UseCase\SendLostPw\ISendLostPwUc;
use Navplan\User\UseCase\SendRegisterEmail\ISendRegisterEmailUc;
use Navplan\User\UseCase\UpdatePw\IUpdatePwUc;


class UserController {
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
