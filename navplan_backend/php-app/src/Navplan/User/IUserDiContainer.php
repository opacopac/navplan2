<?php declare(strict_types=1);

namespace Navplan\User;

use Navplan\Common\Rest\Controller\IRestController;


interface IUserDiContainer
{
    function getUserController(): IRestController;
}
