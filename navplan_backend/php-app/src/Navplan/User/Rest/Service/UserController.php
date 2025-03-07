<?php declare(strict_types=1);

namespace Navplan\User\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Domain\Service\IHttpService;
use Navplan\User\Rest\Model\LoginRequestConverter;
use Navplan\User\Rest\Model\RegisterRequestConverter;
use Navplan\User\Rest\Model\ResetPwRequestConverter;
use Navplan\User\Rest\Model\SendLostPwRequestConverter;
use Navplan\User\Rest\Model\SendRegisterEmailRequestConverter;
use Navplan\User\Rest\Model\RestTokenConverter;
use Navplan\User\Rest\Model\UpdatePwRequestConverter;
use Navplan\User\Rest\Model\UserResponseConverter;
use Navplan\User\UseCase\AutoLogin\IAutoLoginUc;
use Navplan\User\UseCase\Login\ILoginUc;
use Navplan\User\UseCase\Register\IRegisterUc;
use Navplan\User\UseCase\ResetPw\IResetPwUc;
use Navplan\User\UseCase\SendLostPw\ISendLostPwUc;
use Navplan\User\UseCase\SendRegisterEmail\ISendRegisterEmailUc;
use Navplan\User\UseCase\UpdatePw\IUpdatePwUc;


class UserController implements IRestController
{
    const ARG_ACTION = "action";
    const ACTION_LOGIN = "login";
    const ACTION_AUTOLOGIN = "autologin";
    const ACTION_SEND_REGISTER_MAIL = "sendregisteremail";
    const ACTION_REGISTER = "register";
    const ACTION_SEND_LOST_PW = "sendlostpwemail";
    const ACTION_RESET_PW = "resetpassword";
    const ACTION_UPDATE_PW = "updatepassword";


    public function __construct(
        private IHttpService $httpService,
        private ILoginUc $loginUc,
        private IAutoLoginUc $autoLoginUc,
        private ISendRegisterEmailUc $sendRegisterEmailUc,
        private IRegisterUc $registerUc,
        private ISendLostPwUc $sendLostPwUc,
        private IResetPwUc $resetPwUc,
        private IUpdatePwUc $updatePwUc
    )
    {
    }


    public function processRequest()
    {
        $postVars = $this->httpService->getPostArgs();
        $action = $postVars[self::ARG_ACTION] ?? NULL;
        switch ($action) {
            case self::ACTION_LOGIN:
                $request = LoginRequestConverter::fromArgs($postVars);
                $response = $this->loginUc->login($request);
                $this->httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_AUTOLOGIN:
                $token = RestTokenConverter::getToken($this->httpService->getCookies());
                $response = $this->autoLoginUc->autologin($token);
                $this->httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_SEND_REGISTER_MAIL:
                $request = SendRegisterEmailRequestConverter::fromArgs($postVars);
                $response = $this->sendRegisterEmailUc->sendRegisterEmail($request);
                $this->httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_REGISTER:
                $token = RestTokenConverter::getToken($this->httpService->getCookies());
                $request = RegisterRequestConverter::fromArgs($postVars, $token);
                $response = $this->registerUc->register($request);
                $this->httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_SEND_LOST_PW:
                $request = SendLostPwRequestConverter::fromArgs($postVars);
                $response = $this->sendLostPwUc->sendLostPw($request);
                $this->httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_RESET_PW:
                $token = RestTokenConverter::getToken($this->httpService->getCookies());
                $request = ResetPwRequestConverter::fromArgs($postVars, $token);
                $response = $this->resetPwUc->resetPassword($request);
                $this->httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            case self::ACTION_UPDATE_PW:
                $token = RestTokenConverter::getToken($this->httpService->getCookies());
                $request = UpdatePwRequestConverter::fromArgs($postVars, $token);
                $response = $this->updatePwUc->updatePassword($request);
                $this->httpService->sendArrayResponse(UserResponseConverter::toRest($response));
                break;
            default:
                throw new InvalidArgumentException("no or invalid action defined!");
        }
    }
}
