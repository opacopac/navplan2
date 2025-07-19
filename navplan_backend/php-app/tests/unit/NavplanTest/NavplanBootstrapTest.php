<?php declare(strict_types=1);

namespace NavplanTest;

use Navplan\NavplanBootstrap;
use Navplan\System\Db\MySql\MySqlDbService;
use Navplan\System\Posix\FileService;
use Navplan\System\Posix\MailService;
use PHPUnit\Framework\TestCase;


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
