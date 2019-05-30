<?php declare(strict_types=1);

namespace Navplan\System\ISystem;

use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\IMailService;


interface ISystemConfig {
    function getMailService(): IMailService;

    function getHttpResponseService(): IHttpResponseService;
}
