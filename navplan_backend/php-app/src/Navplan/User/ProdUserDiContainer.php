<?php declare(strict_types=1);

namespace Navplan\User;

use Navplan\System\Domain\Service\IDbService;
use Navplan\System\Domain\Service\ILoggingService;
use Navplan\System\Domain\Service\IMailService;
use Navplan\User\Domain\Service\ITokenConfig;
use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\Domain\Service\IUserPointRepo;
use Navplan\User\Domain\Service\IUserRepo;
use Navplan\User\Domain\Service\IUserService;
use Navplan\User\Domain\Service\TokenService;
use Navplan\User\Domain\Service\UserService;
use Navplan\User\Persistence\Service\DbUserPointRepo;
use Navplan\User\Persistence\Service\DbUserRepo;
use Navplan\User\UseCase\AutoLogin\AutoLoginUc;
use Navplan\User\UseCase\AutoLogin\IAutoLoginUc;
use Navplan\User\UseCase\Login\ILoginUc;
use Navplan\User\UseCase\Login\LoginUc;
use Navplan\User\UseCase\Register\IRegisterUc;
use Navplan\User\UseCase\Register\RegisterUc;
use Navplan\User\UseCase\ResetPw\IResetPwUc;
use Navplan\User\UseCase\ResetPw\ResetPwUc;
use Navplan\User\UseCase\SearchUserPoint\ISearchUserPointUc;
use Navplan\User\UseCase\SearchUserPoint\SearchUserPointUc;
use Navplan\User\UseCase\SendLostPw\ISendLostPwUc;
use Navplan\User\UseCase\SendLostPw\SendLostPwUc;
use Navplan\User\UseCase\SendRegisterEmail\ISendRegisterEmailUc;
use Navplan\User\UseCase\SendRegisterEmail\SendRegisterEmailUc;
use Navplan\User\UseCase\UpdatePw\IUpdatePwUc;
use Navplan\User\UseCase\UpdatePw\UpdatePwUc;


class ProdUserDiContainer implements IUserDiContainer {
    private IUserRepo $userRepo;
    private IUserPointRepo $userPointRepo;
    private ITokenService $tokenService;
    private IUserService $userService;
    private ILoginUc $loginUc;
    private IAutoLoginUc $autologinUc;
    private ISendRegisterEmailUc $sendRegisterEmailUc;
    private IRegisterUc $registerUc;
    private ISendLostPwUc $sendLostPwUc;
    private IResetPwUc $resetPwUc;
    private IUpdatePwUc $updatePwUc;
    private ISearchUserPointUc $searchUserPointUc;


    public function __construct(
        private readonly IDbService $dbService,
        private readonly IMailService $mailService,
        private readonly ITokenConfig $tokenCredentials,
        private readonly ILoggingService $loggingService
    ) {
    }


    public function getUserRepo(): IUserRepo {
        if (!isset($this->userRepo)) {
            $this->userRepo = new DbUserRepo($this->dbService);
        }

        return $this->userRepo;
    }


    public function getUserPointRepo(): IUserPointRepo {
        if (!isset($this->userPointRepo)) {
            $this->userPointRepo = new DbUserPointRepo($this->dbService);
        }

        return $this->userPointRepo;
    }


    public function getTokenService(): ITokenService {
        if (!isset($this->tokenService)) {
            $this->tokenService = new TokenService(
                $this->tokenCredentials->getTokenCredentials()
            );
        }

        return $this->tokenService;
    }


    public function getUserService(): IUserService {
        if (!isset($this->userService)) {
            $this->userService = new UserService(
                $this->getTokenService(),
                $this->getUserRepo()
            );
        }

        return $this->userService;
    }


    public function getLoginUc(): ILoginUc {
        if (!isset($this->loginUc)) {
            $this->loginUc = new LoginUc(
                $this->getUserRepo(),
                $this->getTokenService()
            );
        }

        return $this->loginUc;
    }


    public function getAutoLoginUc(): IAutoLoginUc {
        if (!isset($this->autologinUc)) {
            $this->autologinUc = new AutoLoginUc($this->getTokenService());
        }

        return $this->autologinUc;
    }


    function getSendRegisterEmailUc(): ISendRegisterEmailUc {
        if (!isset($this->sendRegisterEmailUc)) {
            $this->sendRegisterEmailUc = new SendRegisterEmailUc(
                $this->getUserRepo(),
                $this->getTokenService(),
                $this->mailService,
                $this->loggingService
            );
        }

        return $this->sendRegisterEmailUc;
    }


    public function getRegisterUc(): IRegisterUc {
        if (!isset($this->registerUc)) {
            $this->registerUc = new RegisterUc(
                $this->getUserRepo(),
                $this->getTokenService()
            );
        }

        return $this->registerUc;
    }


    public function getSendLostPwUc(): ISendLostPwUc {
        if (!isset($this->sendLostPwUc)) {
            $this->sendLostPwUc = new SendLostPwUc(
                $this->getUserRepo(),
                $this->getTokenService(),
                $this->mailService
            );
        }

        return $this->sendLostPwUc;
    }


    public function getResetPwUc(): IResetPwUc {
        if (!isset($this->resetPwUc)) {
            $this->resetPwUc = new ResetPwUc(
                $this->getUserRepo(),
                $this->getTokenService()
            );
        }

        return $this->resetPwUc;
    }


    public function getUpdatePwUc(): IUpdatePwUc {
        if (!isset($this->updatePwUc)) {
            $this->updatePwUc = new UpdatePwUc(
                $this->getUserRepo(),
                $this->getTokenService()
            );
        }

        return $this->updatePwUc;
    }


    function getSearchUserPointUc(): ISearchUserPointUc {
        if (!isset($this->searchUserPointUc)) {
            $this->searchUserPointUc = new SearchUserPointUc(
                $this->getUserPointRepo(),
                $this->getTokenService()
            );
        }

        return $this->searchUserPointUc;
    }

}
