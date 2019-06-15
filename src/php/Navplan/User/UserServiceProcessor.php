<?php declare(strict_types=1);

namespace Navplan\User;

use InvalidArgumentException;
use Navplan\User\Rest\RestAutoLoginRequest;
use Navplan\User\Rest\RestLoginRequest;
use Navplan\User\Rest\RestRegisterRequest;
use Navplan\User\Rest\RestResetPwRequest;
use Navplan\User\Rest\RestSendLostPwRequest;
use Navplan\User\Rest\RestSendRegisterEmailRequest;
use Navplan\User\Rest\RestUpdatePwRequest;
use Navplan\User\Rest\RestUserResponse;
use Navplan\User\UseCase\AutoLogin;
use Navplan\User\UseCase\IUserConfig;
use Navplan\User\UseCase\Login;
use Navplan\User\UseCase\Register;
use Navplan\User\UseCase\ResetPw;
use Navplan\User\UseCase\SendLostPw;
use Navplan\User\UseCase\SendRegisterEmail;
use Navplan\User\UseCase\UpdatePw;


class UserServiceProcessor {
    const ARG_ACTION = "action";
    const ACTION_LOGIN = "login";
    const ACTION_AUTOLOGIN = "autologin";
    const ACTION_SEND_REGISTER_MAIL = "sendregisteremail";
    const ACTION_REGISTER = "register";
    const ACTION_SEND_LOST_PW = "sendlostpwemail";
    const ACTION_RESET_PW = "resetpassword";
    const ACTION_UPDATE_PW = "updatepassword";


    public static function processRequest(?array $postVars, IUserConfig $config) {
        $httpService = $config->getSystemServiceFactory()->getHttpService();
        $action = isset($postVars[self::ARG_ACTION]) ? $postVars[self::ARG_ACTION] : NULL;
        switch ($action) {
            case self::ACTION_LOGIN:
                $request = RestLoginRequest::fromArgs($postVars);
                $response = (new Login($config))->login($request);
                $httpService->sendArrayResponse(RestUserResponse::toRest($response));
                break;
            case self::ACTION_AUTOLOGIN:
                $request = RestAutologinRequest::fromArgs($postVars);
                $response = (new AutoLogin($config))->autologin($request);
                $httpService->sendArrayResponse(RestUserResponse::toRest($response));
                break;
            case self::ACTION_SEND_REGISTER_MAIL:
                $request = RestSendRegisterEmailRequest::fromArgs($postVars);
                $response = (new SendRegisterEmail($config))->sendRegisterEmail($request);
                $httpService->sendArrayResponse(RestUserResponse::toRest($response));
                break;
            case self::ACTION_REGISTER:
                $request = RestRegisterRequest::fromArgs($postVars);
                $response = (new Register($config))->register($request);
                $httpService->sendArrayResponse(RestUserResponse::toRest($response));
                break;
            case self::ACTION_SEND_LOST_PW:
                $request = RestSendLostPwRequest::fromArgs($postVars);
                $response = (new SendLostPw($config))->sendLostPw($request);
                $httpService->sendArrayResponse(RestUserResponse::toRest($response));
                break;
            case self::ACTION_RESET_PW:
                $request = RestResetPwRequest::fromArgs($postVars);
                $response = (new ResetPw($config))->resetPassword($request);
                $httpService->sendArrayResponse(RestUserResponse::toRest($response));
                break;
            case self::ACTION_UPDATE_PW:
                $request = RestUpdatePwRequest::fromArgs($postVars);
                $response = (new UpdatePw($config))->updatePassword($request);
                $httpService->sendArrayResponse(RestUserResponse::toRest($response));
                break;
            default:
                throw new InvalidArgumentException("no or invalid action defined!");
        }
    }
}
