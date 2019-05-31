<?php declare(strict_types=1);

use Navplan\Db\IDb\IDbService;
use Navplan\System\IFileService;
use Navplan\Shared\InvalidFormatException;
use Navplan\Traffic\TrafficServiceProcessor;
use NavplanTest\Db\Mock\DbServiceMock;
use NavplanTest\System\Mock\FileServiceMock;
use NavplanTest\System\Mock\HttpResponseServiceMock;
use PHPUnit\Framework\TestCase;


class TrafficServiceProcessorTest extends TestCase {
    private $dbService;
    private $fileService;
    private $httpService;


    private function getDbService(): IDbService {
        return $this->dbService;
    }


    private function getFileService(): IFileService {
        return $this->fileService;
    }


    private function getHttpService(): HttpResponseServiceMock {
        return $this->httpService;
    }


    protected function setUp(): void {
        parent::setUp();

        $this->dbService = new DbServiceMock();
        $this->fileService = new FileServiceMock();
        $this->httpService = new HttpResponseServiceMock();
    }


    public function test_processRequest_ogn_gets_called() {
        $reqMeth = 'GET';
        $getVars["action"] = "readadsbextraffic";
        $this->expectException(InvalidFormatException::class); // expected, due to missing parameters
        TrafficServiceProcessor::processRequest($reqMeth, $getVars, NULL, $this->getDbService(), $this->getFileService(), $this->getHttpService());
    }


    public function test_processRequest_adsbex_gets_called() {
        $reqMeth = 'GET';
        $getVars["action"] = "readogntraffic";
        $this->expectException(InvalidFormatException::class); // expected, due to missing parameters
        TrafficServiceProcessor::processRequest($reqMeth, $getVars, NULL, $this->getDbService(), $this->getFileService(), $this->getHttpService());
    }


    public function test_processRequest_read_aircraft_details_gets_called() {
        $reqMeth = 'POST';
        $postVars["action"] = "readacdetails";
        $this->expectException(InvalidArgumentException::class); // expected, due to missing parameters
        TrafficServiceProcessor::processRequest($reqMeth, NULL, $postVars, $this->getDbService(), $this->getFileService(), $this->getHttpService());
    }


    public function test_processRequest_throws_exception_for_unknown_req_method() {
        $reqMeth = 'XXX';
        $this->expectException(InvalidArgumentException::class);
        TrafficServiceProcessor::processRequest($reqMeth, NULL, NULL, $this->getDbService(), $this->getFileService(), $this->getHttpService());
    }


    public function test_processRequest_throws_exception_for_unknown_get_action() {
        $reqMeth = 'GET';
        $getVars = array('action' => 'xxx');
        $this->expectException(InvalidArgumentException::class);
        TrafficServiceProcessor::processRequest($reqMeth, $getVars, NULL, $this->getDbService(), $this->getFileService(), $this->getHttpService());
    }


    public function test_processRequest_throws_exception_for_unknown_post_action() {
        $reqMeth = 'POST';
        $getVars = array('action' => 'xxx');
        $this->expectException(InvalidArgumentException::class);
        TrafficServiceProcessor::processRequest($reqMeth, $getVars, NULL, $this->getDbService(), $this->getFileService(), $this->getHttpService());
    }
}
