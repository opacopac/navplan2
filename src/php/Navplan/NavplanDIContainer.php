<?php declare(strict_types=1);

namespace Navplan;

use Navplan\Shared\DbService;
use Navplan\Shared\IFileService;
use Navplan\Shared\IMailService;


class NavplanDIContainer {
    private $dbService;
    private $fileService;
    private $mailService;


    public function __construct(
        IFileService $fileService,
        DbService $dbService,
        IMailService $mailService
    ) {
        $this->fileService = $fileService;
        $this->dbService = $dbService;
        $this->mailService = $mailService;
    }


    public function getFileService(): IFileService {
        return $this->fileService;
    }


    public function getDbService(): DbService {
        return $this->dbService;
    }


    public function getMailService(): IMailService {
        return $this->mailService;
    }
}
