<?php declare(strict_types=1);

namespace NavplanTest\Search\RestService;

use InvalidArgumentException;
use Navplan\Search\RestModel\RestSearchByPositionQueryConverter;
use Navplan\Search\RestModel\RestSearchByTextQueryConverter;
use Navplan\Search\RestService\SearchServiceController;
use NavplanTest\Aerodrome\Mocks\DummyReportingPoint1;
use NavplanTest\Aerodrome\Mocks\MockReportingPointRepo;
use NavplanTest\Enroute\Mocks\DummyNavaid1;
use NavplanTest\Enroute\Mocks\MockNavaidService;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


class SearchServiceProcessorTest extends TestCase {
    private MockNavplanDiContainer $config;
    private string $expectedNavaidRegexp;
    private string $expectedRpRegexp;


    private function getHttpService(): ?MockHttpService {
        return new MockHttpService();
    }


    private function getNavaidMockRepo(): ?MockNavaidService {
        $mockRepo = $this->config->navaidService;
        return $mockRepo instanceof MockNavaidService ? $mockRepo : NULL;
    }


    private function getRpMockRepo(): ?MockReportingPointRepo {
        $mockRepo = $this->config->reportingPointRepo;
        return $mockRepo instanceof MockReportingPointRepo ? $mockRepo : NULL;
    }


    protected function setUp(): void {
        $this->config = new MockNavplanDiContainer();

        $navaid = DummyNavaid1::create();
        $this->expectedNavaidRegexp = '/(.*)"kuerzel":"' . $navaid->kuerzel . '"/';
        $this->getNavaidMockRepo()->pushMockResult([ $navaid ]);

        $rp = DummyReportingPoint1::create();
        $this->expectedRpRegexp = '/(.*)"name":"' . $rp->name . '"/';
        $this->getRpMockRepo()->pushMockResult([ $rp ]);
    }


    public function test_no_action_throws_error() {
        $getVars = array(
            "dummy" => "dummy"
        );
        $this->expectException(InvalidArgumentException::class);
        SearchServiceController::processRequest($getVars, $this->config);
    }


    public function test_processRequest_searchByPosition_gets_called() {
        $getVars = array(
            SearchServiceController::ARG_ACTION => SearchServiceController::ACTION_SEARCH_BY_POSITION,
            RestSearchByPositionQueryConverter::ARG_SEARCH_ITEMS => "navaids",
            RestSearchByPositionQueryConverter::ARG_LON => "7.0",
            RestSearchByPositionQueryConverter::ARG_LAT => "47.0",
            RestSearchByPositionQueryConverter::ARG_RADIUS => "10"
        );
        SearchServiceController::processRequest($getVars, $this->config);
        $this->assertRegExp($this->expectedNavaidRegexp, $this->getHttpService()->body);
    }


    public function test_processRequest_searchByText_gets_called() {
        $getVars = array(
            SearchServiceController::ARG_ACTION => SearchServiceController::ACTION_SEARCH_BY_TEXT,
            RestSearchByTextQueryConverter::ARG_SEARCH_ITEMS => "navaids",
            RestSearchByTextQueryConverter::ARG_SEARCH_TEXT => "FRI"
        );
        SearchServiceController::processRequest($getVars, $this->config);
        $this->assertRegExp($this->expectedNavaidRegexp, $this->getHttpService()->body);
    }
}
