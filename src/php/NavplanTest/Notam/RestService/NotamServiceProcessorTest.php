<?php declare(strict_types=1);

namespace NavplanTest\Notam\RestService;

use InvalidArgumentException;
use Navplan\Notam\RestModel\ReadNotamByExtentRequestConverter;
use Navplan\Notam\RestService\NotamServiceController;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\Notam\Mocks\DummyNotam1;
use NavplanTest\Notam\Mocks\MockNotamRepo;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


class NotamServiceProcessorTest extends TestCase {
    private MockNavplanDiContainer $config;
    private MockHttpService $httpService;
    private MockNotamRepo $notamRepo;


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->httpService = $this->config->httpService;
        $this->notamRepo = $this->config->notamService;
    }


    public function test_no_action_throws_error() {
        $getVars = array("dummy" => "dummy");
        $this->expectException(InvalidArgumentException::class);

        NotamServiceController::processRequest($getVars, $this->config);
    }


    public function test_processRequest_searchByExtent_gets_called() {
        $getVars = array(
            NotamServiceController::ARG_ACTION => NotamServiceController::ACTION_SEARCH_BY_EXTENT,
            ReadNotamByExtentRequestConverter::ARG_MIN_LON => "7.0",
            ReadNotamByExtentRequestConverter::ARG_MIN_LAT => "47.0",
            ReadNotamByExtentRequestConverter::ARG_MAX_LON => "7.9",
            ReadNotamByExtentRequestConverter::ARG_MAX_LAT => "47.9",
            ReadNotamByExtentRequestConverter::ARG_ZOOM => "11",
            ReadNotamByExtentRequestConverter::ARG_MIN_NOTAM_TIME => "1560603981",
            ReadNotamByExtentRequestConverter::ARG_MAX_NOTAM_TIME => "1560703981",
        );
        $notamResult = DummyNotam1::create();
        $this->notamRepo->pushMockResult([$notamResult]);

        NotamServiceController::processRequest($getVars, $this->config);

        $this->assertRegExp("/notams/", $this->httpService->body);
        $this->assertRegExp("/" . $notamResult->id . "/", $this->httpService->body);
    }
}
