<?php declare(strict_types=1);

namespace Navplan\System;

require_once __DIR__ . "/../../Autoloader.php";


class SystemConfigProd implements ISystemConfig {
    private $mailService;
    private $fileService;
    private $httpResponseService;


    public function __construct() {
        $this->mailService = MailService::getInstance();
        $this->fileService = FileService::getInstance();
        $this->httpResponseService = HttpResponseService::getInstance();
    }


    public function getMailService(): IMailService{
        return $this->mailService;
    }


    public function getHttpResponseService(): IHttpResponseService {
        return $this->httpResponseService;
    }


    public function getFileService(): IFileService {
        return $this->fileService;
    }
}
