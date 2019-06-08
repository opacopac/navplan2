<?php declare(strict_types=1);

namespace Navplan\System;

require_once __DIR__ . "/../../Autoloader.php";


class SystemConfigProd implements ISystemConfig {
    private $mailService;
    private $fileService;
    private $httpService;


    public function __construct() {
        $this->mailService = MailService::getInstance();
        $this->fileService = FileService::getInstance();
        $this->httpService = HttpService::getInstance();
    }


    public function getMailService(): IMailService{
        return $this->mailService;
    }


    public function getHttpService(): IHttpService {
        return $this->httpService;
    }


    public function getFileService(): IFileService {
        return $this->fileService;
    }
}
