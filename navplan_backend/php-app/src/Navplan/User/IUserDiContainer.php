<?php declare(strict_types=1);

namespace Navplan\User;

use Navplan\User\Domain\Service\ITokenService;
use Navplan\User\Domain\Service\IUserPointRepo;
use Navplan\User\Domain\Service\IUserRepo;
use Navplan\User\Domain\Service\IUserService;
use Navplan\User\UseCase\AutoLogin\IAutoLoginUc;
use Navplan\User\UseCase\Login\ILoginUc;
use Navplan\User\UseCase\Register\IRegisterUc;
use Navplan\User\UseCase\ResetPw\IResetPwUc;
use Navplan\User\UseCase\SearchUserPoint\ISearchUserPointUc;
use Navplan\User\UseCase\SendLostPw\ISendLostPwUc;
use Navplan\User\UseCase\SendRegisterEmail\ISendRegisterEmailUc;
use Navplan\User\UseCase\UpdatePw\IUpdatePwUc;


interface IUserDiContainer
{
    function getUserRepo(): IUserRepo;

    function getUserPointRepo(): IUserPointRepo;

    function getTokenService(): ITokenService;

    function getUserService(): IUserService;

    function getLoginUc(): ILoginUc;

    function getAutoLoginUc(): IAutoLoginUc;

    function getSendRegisterEmailUc(): ISendRegisterEmailUc;

    function getRegisterUc(): IRegisterUc;

    function getSendLostPwUc(): ISendLostPwUc;

    function getResetPwUc(): IResetPwUc;

    function getUpdatePwUc(): IUpdatePwUc;

    function getSearchUserPointUc(): ISearchUserPointUc;
}
