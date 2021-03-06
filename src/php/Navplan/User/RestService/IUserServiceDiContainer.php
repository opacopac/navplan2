<?php declare(strict_types=1);

namespace Navplan\User\RestService;

use Navplan\System\DomainService\IHttpService;
use Navplan\User\DomainService\ITokenService;
use Navplan\User\DomainService\IUserRepo;
use Navplan\User\UseCase\AutoLogin\IAutoLoginUc;
use Navplan\User\UseCase\Login\ILoginUc;
use Navplan\User\UseCase\Register\IRegisterUc;
use Navplan\User\UseCase\ResetPw\IResetPwUc;
use Navplan\User\UseCase\SearchUserPoint\ISearchUserPointUc;
use Navplan\User\UseCase\SendLostPw\ISendLostPwUc;
use Navplan\User\UseCase\SendRegisterEmail\ISendRegisterEmailUc;
use Navplan\User\UseCase\UpdatePw\IUpdatePwUc;


interface IUserServiceDiContainer {
    function getHttpService(): IHttpService;

    function getUserRepo(): IUserRepo;

    function getTokenService(): ITokenService;

    function getLoginUc(): ILoginUc;

    function getAutoLoginUc(): IAutoLoginUc;

    function getSendRegisterEmailUc(): ISendRegisterEmailUc;

    function getRegisterUc(): IRegisterUc;

    function getSendLostPwUc(): ISendLostPwUc;

    function getResetPwUc(): IResetPwUc;

    function getUpdatePwUc(): IUpdatePwUc;

    function getSearchUserPointUc(): ISearchUserPointUc;
}
