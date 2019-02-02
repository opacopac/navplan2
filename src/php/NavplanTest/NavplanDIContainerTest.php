<?php declare(strict_types=1);

use Navplan\NavplanDIContainer;
use Navplan\Shared\DbService;
use Navplan\Shared\FileService;
use PHPUnit\Framework\TestCase;


class NavplanDIContainerTest extends TestCase
{
    private $fileService;
    private $dbService;
    private $mailService;
    private $container;


    protected function setUp() {
        parent::setUp();

        $this->fileService = FileService::getInstance();
        $this->dbService = new DbService();
        $this->mailService = \Navplan\Shared\MailService::getInstance();
        $this->container = new NavplanDIContainer(
            $this->fileService,
            $this->dbService,
            $this->mailService
        );
    }


    private function getContainer(): NavplanDIContainer {
        return $this->container;
    }


    public function test_create_instance() {
        $this->assertNotNull($this->getContainer());
    }


    public function test_getDbService()
    {
        $service = $this->getContainer()->getDbService();
        $this->assertEquals($service, $this->dbService);
    }


    public function test_getFileService()
    {
        $service = $this->getContainer()->getFileService();
        $this->assertEquals($service, $this->fileService);
    }


    public function test_getMailService()
    {
        $service = $this->getContainer()->getMailService();
        $this->assertEquals($service, $this->mailService);
    }
}
