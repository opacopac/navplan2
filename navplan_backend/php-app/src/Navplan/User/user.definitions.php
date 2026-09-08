<?php declare(strict_types=1);

/**
 * PHP-DI definitions for the User module.
 * Replaces the former ProdUserDiContainer.
 */

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
use function DI\get;

return [
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

    // Bound to the CONCRETE class, not to the shared IRestController interface
    // (see webcam.definitions.php for the reason).
    UserController::class => autowire(),

    // TokenService takes the raw token credentials value (not a class/interface),
    // so it can't be wired via plain autowiring alone. Bound to the concrete
    // class too, since UserService type-hints TokenService directly instead
    // of the ITokenService interface.
    TokenService::class => factory(function (ITokenConfig $tokenConfig) {
        return new TokenService($tokenConfig->getTokenCredentials());
    }),
    ITokenService::class => get(TokenService::class),
];

