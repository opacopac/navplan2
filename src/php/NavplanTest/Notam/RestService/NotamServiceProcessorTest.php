<?php declare(strict_types=1);

namespace NavplanTest\Notam\RestService;

use InvalidArgumentException;
use Navplan\Notam\RestModel\ReadNotamRequestConverter;
use Navplan\Notam\RestService\NotamServiceProcessor;
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
        $this->notamRepo = $this->config->notamRepo;
    }


    public function test_no_action_throws_error() {
        $getVars = array("dummy" => "dummy");
        $this->expectException(InvalidArgumentException::class);

        NotamServiceProcessor::processRequest($getVars, $this->config);
    }


    public function test_processRequest_searchByExtent_gets_called() {
        $getVars = array(
            NotamServiceProcessor::ARG_ACTION => NotamServiceProcessor::ACTION_SEARCH_BY_EXTENT,
            ReadNotamRequestConverter::ARG_MIN_LON => "7.0",
            ReadNotamRequestConverter::ARG_MIN_LAT => "47.0",
            ReadNotamRequestConverter::ARG_MAX_LON => "7.9",
            ReadNotamRequestConverter::ARG_MAX_LAT => "47.9",
            ReadNotamRequestConverter::ARG_ZOOM => "11",
            ReadNotamRequestConverter::ARG_MIN_NOTAM_TIME => "1560603981",
            ReadNotamRequestConverter::ARG_MAX_NOTAM_TIME => "1560703981",
        );
        $notamResult = DummyNotam1::create();
        $this->notamRepo->pushMockResult([$notamResult]);

        NotamServiceProcessor::processRequest($getVars, $this->config);

        $this->assertRegExp("/notams/", $this->httpService->body);
        $this->assertRegExp("/" . $notamResult->id . "/", $this->httpService->body);
    }
}
