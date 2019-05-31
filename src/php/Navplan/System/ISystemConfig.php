<?php declare(strict_types=1);

namespace Navplan\System;

use Navplan\System\IHttpResponseService;
use Navplan\System\IMailService;


interface ISystemConfig {
    function getMailService(): IMailService;

    function getHttpResponseService(): IHttpResponseService;

    function getFileService(): IFileService;
}
