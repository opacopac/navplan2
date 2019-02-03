<?php declare(strict_types=1);

use Navplan\Shared\IDbService;
use Navplan\Shared\IFileService;
use Navplan\Shared\InvalidFormatException;
use Navplan\Traffic\TrafficServiceProcessor;
use NavplanTest\DbServiceMock;
use NavplanTest\FileServiceMock;
use PHPUnit\Framework\TestCase;


class TrafficServiceProcessorTest extends TestCase {
    private $dbService;
    private $fileService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    private function getFileService(): IFileService {
        return $this->fileService;
    }


    protected function setUp() {
        parent::setUp();

        $this->dbService = new DbServiceMock();
        $this->fileService = new FileServiceMock();
    }


    public function test_processRequest_ogn_gets_called() {
        $getVars["action"] = "readadsbextraffic";
        $this->expectException(InvalidFormatException::class); // expected, due to missing parameters
        TrafficServiceProcessor::processRequest($getVars, $this->getDbService(), $this->getFileService());
    }


    public function test_processRequest_adsbex_gets_called() {
        $getVars["action"] = "readogntraffic";
        $this->expectException(InvalidFormatException::class); // expected, due to missing parameters
        TrafficServiceProcessor::processRequest($getVars, $this->getDbService(), $this->getFileService());
    }


    public function test_processRequest_throws_exception_for_unknown_action() {
        $getVars = array('action' => 'xxx');
        $this->expectException(InvalidArgumentException::class);
        TrafficServiceProcessor::processRequest($getVars, $this->getDbService(), $this->getFileService());
    }
}
