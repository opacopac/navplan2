<?php declare(strict_types=1);

namespace NavplanTest\Notam;

use Navplan\Notam\NotamServiceProcessor;
use Navplan\Notam\Rest\RestReadNotamRequest;
use NavplanTest\MockNavplanConfig;
use NavplanTest\Notam\Mocks\DummyNotam1;
use NavplanTest\Notam\Mocks\MockNotamRepo;
use PHPUnit\Framework\TestCase;


class NotamServiceProcessorTest extends TestCase {
    private $config;
    private $httpService;
    /* @var $notamRepo MockNotamRepo */
    private $notamRepo;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->httpService = $this->config->getSystemServiceFactory()->getHttpService();
        $this->notamRepo = $this->config->getNotamRepo();
    }


    public function test_no_action_throws_error() {
        $getVars = array("dummy" => "dummy");
        $this->expectException("InvalidArgumentException");

        NotamServiceProcessor::processRequest($getVars, $this->config);
    }


    public function test_processRequest_searchByExtent_gets_called() {
        $getVars = array(
            NotamServiceProcessor::ARG_ACTION => NotamServiceProcessor::ACTION_SEARCH_BY_EXTENT,
            RestReadNotamRequest::ARG_MIN_LON => "7.0",
            RestReadNotamRequest::ARG_MIN_LAT => "47.0",
            RestReadNotamRequest::ARG_MAX_LON => "7.9",
            RestReadNotamRequest::ARG_MAX_LAT => "47.9",
            RestReadNotamRequest::ARG_ZOOM => "11",
            RestReadNotamRequest::ARG_MIN_NOTAM_TIME => "1560603981",
            RestReadNotamRequest::ARG_MAX_NOTAM_TIME => "1560703981",
        );
        $notamResult = DummyNotam1::create();
        $this->notamRepo->pushMockResult([$notamResult]);

        NotamServiceProcessor::processRequest($getVars, $this->config);

        $this->assertRegExp("/notams/", $this->httpService->body);
        $this->assertRegExp("/" . $notamResult->id . "/", $this->httpService->body);
    }
}
