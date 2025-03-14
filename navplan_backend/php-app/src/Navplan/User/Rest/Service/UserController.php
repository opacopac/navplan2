<?php declare(strict_types=1);

namespace Navplan\User\Rest\Service;

use InvalidArgumentException;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\Common\StringNumberHelper;
use Navplan\System\Domain\Model\HttpRequestMethod;
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
        $action = StringNumberHelper::parseStringOrError($this->httpService->getGetArgs(), self::ARG_ACTION);

        switch ($this->httpService->getRequestMethod()) {
            case HttpRequestMethod::GET:
                switch ($action) {
                    case self::ACTION_AUTOLOGIN:
                        $token = RestTokenConverter::getToken($this->httpService->getCookies());
                        $userResponse = $this->autoLoginUc->autologin($token);
                        break;
                    default:
                        throw new InvalidArgumentException("unsupported action for GET request");
                }
                break;
            case HttpRequestMethod::POST:
                $postVars = $this->httpService->getPostArgs();

                switch ($action) {
                    case self::ACTION_LOGIN:
                        $request = LoginRequestConverter::fromArgs($postVars);
                        $userResponse = $this->loginUc->login($request);
                        break;
                    case self::ACTION_SEND_REGISTER_MAIL:
                        $request = SendRegisterEmailRequestConverter::fromArgs($postVars);
                        $userResponse = $this->sendRegisterEmailUc->sendRegisterEmail($request);
                        break;
                    case self::ACTION_REGISTER:
                        $request = RegisterRequestConverter::fromArgs($postVars);
                        $userResponse = $this->registerUc->register($request);
                        break;
                    case self::ACTION_SEND_LOST_PW:
                        $request = SendLostPwRequestConverter::fromArgs($postVars);
                        $userResponse = $this->sendLostPwUc->sendLostPw($request);
                        break;
                    case self::ACTION_RESET_PW:
                        $token = RestTokenConverter::getToken($this->httpService->getCookies());
                        $request = ResetPwRequestConverter::fromArgs($postVars, $token);
                        $userResponse = $this->resetPwUc->resetPassword($request);
                        break;
                    case self::ACTION_UPDATE_PW:
                        $token = RestTokenConverter::getToken($this->httpService->getCookies());
                        $request = UpdatePwRequestConverter::fromArgs($postVars, $token);
                        $userResponse = $this->updatePwUc->updatePassword($request);
                        break;
                    default:
                        throw new InvalidArgumentException("unsupported action for POST request");
                }
                break;
            default:
                throw new InvalidArgumentException("unsupported request method");
        }

        $response = UserResponseConverter::toRest($userResponse);
        $this->httpService->sendArrayResponse($response);
    }
}
