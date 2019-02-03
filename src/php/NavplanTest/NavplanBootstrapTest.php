<?php declare(strict_types=1);

namespace NavplanTest;

use Navplan\Shared\FileService;
use Navplan\Shared\MailService;
use Navplan\Shared\MySqlDbService;
use PHPUnit\Framework\TestCase;
use Navplan\NavplanBootstrap;


class NavplanBootstrapTest extends TestCase {

    public function testGetAndInitDbService() {
        $dbService = NavplanBootstrap::getAndInitDbService();

        $this->assertTrue($dbService instanceof MySqlDbService);
    }


    public function testGetFileService() {
        $fileService = NavplanBootstrap::getFileService();

        $this->assertTrue($fileService instanceof FileService);
    }


    public function testGetMailService() {
        $mailService = NavplanBootstrap::getMailService();

        $this->assertTrue($mailService instanceof MailService);
    }
}
