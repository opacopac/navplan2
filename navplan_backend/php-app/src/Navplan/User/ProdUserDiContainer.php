<?php declare(strict_types=1);

namespace Navplan\User;

use DI\Container;
use DI\ContainerBuilder;
use Navplan\Common\Rest\Controller\IRestController;
use Navplan\System\Db\Domain\Service\IDbService;
use Navplan\System\Domain\Service\IHttpService;
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
use Navplan\User\Rest\Service\UserController;
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
use function DI\autowire;
use function DI\factory;


class ProdUserDiContainer implements IUserDiContainer
{
    private Container $container;


    public function __construct(
        IHttpService $httpService,
        IDbService $dbService,
        IMailService $mailService,
        ITokenConfig $tokenCredentials,
        ILoggingService $loggingService
    )
    {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        $builder->addDefinitions([
            // externally supplied singletons
            IHttpService::class => $httpService,
            IDbService::class => $dbService,
            IMailService::class => $mailService,
            ITokenConfig::class => $tokenCredentials,
            ILoggingService::class => $loggingService,

            // interface -> implementation bindings
            IUserRepo::class => autowire(DbUserRepo::class),
            IUserPointRepo::class => autowire(DbUserPointRepo::class),
            IUserService::class => autowire(UserService::class),
            ILoginUc::class => autowire(LoginUc::class),
            IAutoLoginUc::class => autowire(AutoLoginUc::class),
            ISendRegisterEmailUc::class => autowire(SendRegisterEmailUc::class),
            IRegisterUc::class => autowire(RegisterUc::class),
            ISendLostPwUc::class => autowire(SendLostPwUc::class),
            IResetPwUc::class => autowire(ResetPwUc::class),
            IUpdatePwUc::class => autowire(UpdatePwUc::class),
            ISearchUserPointUc::class => autowire(SearchUserPointUc::class),
            IRestController::class => autowire(UserController::class),

            // TokenService takes the raw token credentials value (not a class/interface),
            // so it can't be wired via plain autowiring alone. Bound to the concrete
            // class too, since UserService type-hints TokenService directly instead
            // of the ITokenService interface.
            TokenService::class => factory(function (ITokenConfig $tokenCredentials) {
                return new TokenService($tokenCredentials->getTokenCredentials());
            }),
            ITokenService::class => \DI\get(TokenService::class),
        ]);

        $this->container = $builder->build();
    }


    public function getUserController(): IRestController
    {
        return $this->container->get(IRestController::class);
    }


    public function getUserRepo(): IUserRepo
    {
        return $this->container->get(IUserRepo::class);
    }


    public function getUserPointRepo(): IUserPointRepo
    {
        return $this->container->get(IUserPointRepo::class);
    }


    public function getTokenService(): ITokenService
    {
        return $this->container->get(ITokenService::class);
    }


    public function getUserService(): IUserService
    {
        return $this->container->get(IUserService::class);
    }


    public function getLoginUc(): ILoginUc
    {
        return $this->container->get(ILoginUc::class);
    }


    public function getAutoLoginUc(): IAutoLoginUc
    {
        return $this->container->get(IAutoLoginUc::class);
    }


    function getSendRegisterEmailUc(): ISendRegisterEmailUc
    {
        return $this->container->get(ISendRegisterEmailUc::class);
    }


    public function getRegisterUc(): IRegisterUc
    {
        return $this->container->get(IRegisterUc::class);
    }


    public function getSendLostPwUc(): ISendLostPwUc
    {
        return $this->container->get(ISendLostPwUc::class);
    }


    public function getResetPwUc(): IResetPwUc
    {
        return $this->container->get(IResetPwUc::class);
    }


    public function getUpdatePwUc(): IUpdatePwUc
    {
        return $this->container->get(IUpdatePwUc::class);
    }


    function getSearchUserPointUc(): ISearchUserPointUc
    {
        return $this->container->get(ISearchUserPointUc::class);
    }
}
