<?php declare(strict_types=1);

use Navplan\Shared\InvalidFormatException;
use NavplanTest\FileServiceMock;
use PHPUnit\Framework\TestCase;
use Navplan\Traffic\ReadAdsbexTraffic;


class ReadAdsbexTrafficTest extends TestCase
{
    private $dummyArgs1;
    private $dummyResponse1;
    private $dummyResponse2;
    private $fileService;


    private function getFileService(): FileServiceMock {
        return $this->fileService;
    }


    protected function setUp()
    {
        parent::setUp();
        $this->dummyArgs1 = array(
            "lat" => "47.0",
            "lon" => "7.0",
            "dist" => "123",
            "callback" => "callback"
        );

        $this->dummyResponse1 =  '{"ac":[';
        $this->dummyResponse1 .= '{"postime":"1549195031085","icao":"39840F","reg":"F-HBAP","type":"A320","spd":"343","alt":"18650","lat":"46.685658","lon":"7.302544","vsi":"-1408","trak":"24.8","sqk":"1022","call":"AAF786","gnd":"0","trt":"4","pos":"1","mlat":"0","tisb":"0","mil":"0"},';
        $this->dummyResponse1 .= '{"postime":"1549195029944","icao":"48AF02","reg":"SP-LVC","type":"B38M","spd":"448","alt":"39000","lat":"47.032745","lon":"7.002686","vsi":"64","trak":"231.5","sqk":"3567","call":"LOT433","gnd":"0","trt":"5","pos":"1","mlat":"0","tisb":"0","mil":"0"}';
        $this->dummyResponse1 .= '],"total":3,"ctime":1549195033854,"req_ip":"217.26.58.54"}';

        $this->dummyResponse2 = '{"ac":null,"total":0,"ctime":1549196379859,"req_ip":"217.26.58.54"}';

        $this->fileService = new FileServiceMock();
    }


    // region lon, lat, dist

    public function test_readTraffic_throws_exception_for_missing_lon()
    {
        $args = array("lon" => "7.0", "dist" => "123");
        $this->expectException(InvalidFormatException::class);
        ReadAdsbexTraffic::readTraffic($args, $this->getFileService());
    }


    public function test_readTraffic_throws_exception_for_missing_lat()
    {
        $args = array("lat" => "47.0", "dist" => "123");
        $this->expectException(InvalidFormatException::class);
        ReadAdsbexTraffic::readTraffic($args, $this->getFileService());
    }


    public function test_readTraffic_throws_exception_for_missing_dist()
    {
        $args = array("lat" => "47.0a", "lon" => 7.0, "dist" => "123");
        $this->expectException(InvalidFormatException::class);
        ReadAdsbexTraffic::readTraffic($args, $this->getFileService());
    }


    public function test_readTraffic_throws_exception_for_nonnumerical_lon()
    {
        $args = array("lat" => "abc", "lon" => 7.0, "dist" => "123");
        $this->expectException(InvalidFormatException::class);
        ReadAdsbexTraffic::readTraffic($args, $this->getFileService());
    }


    public function test_readTraffic_throws_exception_for_nonnumerical_lat()
    {
        $args = array("lat" => "47.0", "lon" => "abc", "dist" => "123");
        $this->expectException(InvalidFormatException::class);
        ReadAdsbexTraffic::readTraffic($args, $this->getFileService());
    }


    public function test_readTraffic_throws_exception_for_nonnumerical_dist()
    {
        $args = array("lat" => "47.0", "lon" => "7.0", "dist" => "abc");
        $this->expectException(InvalidFormatException::class);
        ReadAdsbexTraffic::readTraffic($args, $this->getFileService());
    }

    // endregion


    public function test_readTraffic_url_contains_parameters()
    {
        $this->getFileService()->setResultFileGetContents($this->dummyResponse1);
        $this->expectOutputRegex('/./');
        ReadAdsbexTraffic::readTraffic($this->dummyArgs1, $this->getFileService());
        $urlCalled = $this->getFileService()->getFileGetContentsFilename();

        $this->assertContains('lat/' . $this->dummyArgs1["lat"] , $urlCalled);
        $this->assertContains('lon/' . $this->dummyArgs1["lon"], $urlCalled);
        $this->assertContains('dist/' . $this->dummyArgs1["dist"], $urlCalled);
    }


    public function test_readTraffic_options_for_http_header_are_set()
    {
        $this->getFileService()->setResultFileGetContents($this->dummyResponse1);
        $this->expectOutputRegex('/./');
        ReadAdsbexTraffic::readTraffic($this->dummyArgs1, $this->getFileService());
        $context = $this->getFileService()->getFileGetContentsContext();

        $this->assertNotNull($context);
    }


    public function test_readTraffic_response_contains_correct_json_data()
    {
        unset($this->dummyArgs1["callback"]);
        $this->getFileService()->setResultFileGetContents($this->dummyResponse1);
        $this->expectOutputRegex('/^\{\"ac\".*postime.*postime.*total.*\}$/');
        ReadAdsbexTraffic::readTraffic($this->dummyArgs1, $this->getFileService());
        $this->getFileService()->getFileGetContentsFilename();
    }


    public function test_readTraffic_response_contains_correct_jsonp_data()
    {
        $this->dummyArgs1["callback"] = "callback77";
        $this->getFileService()->setResultFileGetContents($this->dummyResponse1);
        $this->expectOutputRegex('/^callback77\(.*\{\"ac\".*postime.*postime.*total.*\}\)$/');
        ReadAdsbexTraffic::readTraffic($this->dummyArgs1, $this->getFileService());
        $this->getFileService()->getFileGetContentsFilename();
    }
}
