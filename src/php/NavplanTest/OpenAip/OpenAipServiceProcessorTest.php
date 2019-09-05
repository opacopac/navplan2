<?php declare(strict_types=1);

namespace NavplanTest\OpenAip;

use InvalidArgumentException;
use Navplan\OpenAip\OpenAipServiceProcessor;
use Navplan\OpenAip\Rest\RestSearchAreaItemsRequest;
use Navplan\OpenAip\Rest\RestSearchPointItemsRequest;
use NavplanTest\MockNavplanConfig;
use NavplanTest\OpenAip\Mocks\DummyAirport1;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use NavplanTest\OpenAip\Mocks\DummyWebcam2;
use NavplanTest\OpenAip\Mocks\MockAirportRepo;
use NavplanTest\OpenAip\Mocks\MockAirspaceRepo;
use NavplanTest\OpenAip\Mocks\MockNavaidRepo;
use NavplanTest\OpenAip\Mocks\MockReportingPointRepo;
use NavplanTest\OpenAip\Mocks\MockWebcamRepo;
use PHPUnit\Framework\TestCase;


class OpenAipServiceProcessorTest extends TestCase {
    private $config;
    private $httpService;
    /* @var $airportRepo MockAirportRepo */
    private $airportRepo;
    /* @var $airspaceRepo MockAirspaceRepo */
    private $airspaceRepo;
    /* @var $navaidRepo MockNavaidRepo */
    private $navaidRepo;
    /* @var $reportingPointRepo MockReportingPointRepo */
    private $reportingPointRepo;
    /* @var $webcamRepo MockWebcamRepo */
    private $webcamRepo;
    private $getVarsSearchPointItems;
    private $getVarsSearchAreaItems;


    protected function setUp(): void {
        $this->config = new MockNavplanConfig();
        $this->httpService = $this->config->getSystemServiceFactory()->getHttpService();
        $this->airportRepo = $this->config->getOpenAipRepoFactory()->createAirportRepo();
        $this->airspaceRepo = $this->config->getOpenAipRepoFactory()->createAirspaceRepo();
        $this->navaidRepo = $this->config->getOpenAipRepoFactory()->createNavaidRepo();
        $this->reportingPointRepo = $this->config->getOpenAipRepoFactory()->createReportingPointRepo();
        $this->webcamRepo = $this->config->getOpenAipRepoFactory()->createWebcamRepo();
        $this->getVarsSearchPointItems = array(
            OpenAipServiceProcessor::ARG_ACTION => OpenAipServiceProcessor::ACTION_SEARCH_POINT_ITEMS,
            RestSearchPointItemsRequest::ARG_MIN_LON => "7.0",
            RestSearchPointItemsRequest::ARG_MIN_LAT => "47.0",
            RestSearchPointItemsRequest::ARG_MAX_LON => "7.9",
            RestSearchPointItemsRequest::ARG_MAX_LAT => "47.9",
            RestSearchPointItemsRequest::ARG_ZOOM => "11",
        );
        $this->getVarsSearchAreaItems = array(
            OpenAipServiceProcessor::ARG_ACTION => OpenAipServiceProcessor::ACTION_SEARCH_AREA_ITEMS,
            RestSearchAreaItemsRequest::ARG_MIN_LON => "7.0",
            RestSearchAreaItemsRequest::ARG_MIN_LAT => "47.0",
            RestSearchAreaItemsRequest::ARG_MAX_LON => "7.9",
            RestSearchAreaItemsRequest::ARG_MAX_LAT => "47.9",
            RestSearchAreaItemsRequest::ARG_ZOOM => "11",
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
