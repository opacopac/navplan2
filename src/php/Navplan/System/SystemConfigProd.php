<?php declare(strict_types=1);

namespace Navplan\System;

require_once __DIR__ . "/../../Autoloader.php";

use Navplan\Shared\HttpResponseService;
use Navplan\Shared\IMailService;
use Navplan\Shared\IHttpResponseService;
use Navplan\Shared\MailService;
use Navplan\System\ISystem\ISystemConfig;


class SystemConfigProd implements ISystemConfig {
    private $mailService;
    private $httpResponseService;


    public function __construct() {
        $this->mailService = MailService::getInstance();
        $this->httpResponseService = HttpResponseService::getInstance();
    }


    public function getMailService(): IMailService{
        return $this->mailService;
    }


    public function getHttpResponseService(): IHttpResponseService {
        return $this->httpResponseService;
    }
}
