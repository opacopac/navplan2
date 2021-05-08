<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\RestService;

use InvalidArgumentException;
use Navplan\OpenAip\RestModel\SearchAreaItemsRequestConverter;
use Navplan\OpenAip\RestModel\SearchPointItemsRequestConverter;
use Navplan\OpenAip\RestService\OpenAipServiceProcessor;
use NavplanTest\Airport\Mocks\DummyAirport1;
use NavplanTest\Airport\Mocks\DummyReportingPoint1;
use NavplanTest\Airport\Mocks\MockAirportRepo;
use NavplanTest\Airport\Mocks\MockReportingPointRepo;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use NavplanTest\OpenAip\Mocks\DummyWebcam2;
use NavplanTest\OpenAip\Mocks\MockAirspaceRepo;
use NavplanTest\OpenAip\Mocks\MockNavaidRepo;
use NavplanTest\OpenAip\Mocks\MockWebcamRepo;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


class OpenAipServiceProcessorTest extends TestCase {
    private MockNavplanDiContainer $config;
    private MockHttpService $httpService;
    private MockAirportRepo $airportRepo;
    private MockAirspaceRepo $airspaceRepo;
    private MockNavaidRepo $navaidRepo;
    private MockReportingPointRepo $reportingPointRepo;
    private MockWebcamRepo $webcamRepo;
    private array $getVarsSearchPointItems;
    private array $getVarsSearchAreaItems;


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();
        $this->httpService = $this->config->httpService;
        $this->airportRepo = $this->config->airportRepo;
        $this->airspaceRepo = $this->config->airspaceRepo;
        $this->navaidRepo = $this->config->navaidRepo;
        $this->reportingPointRepo = $this->config->reportingPointRepo;
        $this->webcamRepo = $this->config->webcamRepo;
        $this->getVarsSearchPointItems = array(
            OpenAipServiceProcessor::ARG_ACTION => OpenAipServiceProcessor::ACTION_SEARCH_POINT_ITEMS,
            SearchPointItemsRequestConverter::ARG_MIN_LON => "7.0",
            SearchPointItemsRequestConverter::ARG_MIN_LAT => "47.0",
            SearchPointItemsRequestConverter::ARG_MAX_LON => "7.9",
            SearchPointItemsRequestConverter::ARG_MAX_LAT => "47.9",
            SearchPointItemsRequestConverter::ARG_ZOOM => "11",
        );
        $this->getVarsSearchAreaItems = array(
            OpenAipServiceProcessor::ARG_ACTION => OpenAipServiceProcessor::ACTION_SEARCH_AREA_ITEMS,
            SearchAreaItemsRequestConverter::ARG_MIN_LON => "7.0",
            SearchAreaItemsRequestConverter::ARG_MIN_LAT => "47.0",
            SearchAreaItemsRequestConverter::ARG_MAX_LON => "7.9",
            SearchAreaItemsRequestConverter::ARG_MAX_LAT => "47.9",
            SearchAreaItemsRequestConverter::ARG_ZOOM => "11",
        );
    }


    public function test_no_action_throws_error() {
        $getVars = array("dummy" => "dummy");
        $this->expectException(InvalidArgumentException::class);

        OpenAipServiceProcessor::processRequest($getVars, $this->config);
    }


    public function test_processRequest_searchPointItems_gets_called() {
        $airport1 = DummyAirport1::create();
        $navaid = DummyNavaid1::create();
        $rp = DummyReportingPoint1::create();
        $cam = DummyWebcam2::create();
        $this->airportRepo->pushMockResult([$airport1]);
        $this->navaidRepo->pushMockResult([$navaid]);
        $this->reportingPointRepo->pushMockResult([$rp]);
        $this->webcamRepo->pushMockResult([$cam]);

        OpenAipServiceProcessor::processRequest($this->getVarsSearchPointItems, $this->config);

        $this->assertRegExp("/airports/", $this->httpService->body);
        $this->assertRegExp("/" . $airport1->id . "/", $this->httpService->body);
        $this->assertRegExp("/navaids/", $this->httpService->body);
        $this->assertRegExp("/" . $navaid->id . "/", $this->httpService->body);
        $this->assertRegExp("/reportingpoints/", $this->httpService->body);
        $this->assertRegExp("/" . $rp->id . "/", $this->httpService->body);
        $this->assertRegExp("/webcams/", $this->httpService->body);
        $this->assertRegExp("/" . $cam->name . "/", $this->httpService->body);
    }


    public function test_processRequest_searchAreaItems_gets_called() {
        $airspaceResult = DummyAirspace1::create();
        $this->airspaceRepo->pushMockResult([$airspaceResult]);

        OpenAipServiceProcessor::processRequest($this->getVarsSearchAreaItems, $this->config);

        $this->assertRegExp("/airspaces/", $this->httpService->body);
        $this->assertRegExp("/" . $airspaceResult->id . "/", $this->httpService->body);
    }
}
