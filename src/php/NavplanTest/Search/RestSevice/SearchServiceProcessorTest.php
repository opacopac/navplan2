<?php declare(strict_types=1);

namespace NavplanTest\Search\RestService;

use InvalidArgumentException;
use Navplan\Search\RestModel\SearchByExtentQueryConverter;
use Navplan\Search\RestModel\SearchByIcaoQueryConverter;
use Navplan\Search\RestModel\SearchByPositionQueryConverter;
use Navplan\Search\RestModel\SearchByTextQueryConverter;
use Navplan\Search\RestService\SearchServiceProcessor;
use NavplanTest\Airport\Mocks\DummyReportingPoint1;
use NavplanTest\Airport\Mocks\MockReportingPointRepo;
use NavplanTest\MockNavplanDiContainer;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use NavplanTest\OpenAip\Mocks\MockNavaidRepo;
use NavplanTest\System\Mock\MockHttpService;
use PHPUnit\Framework\TestCase;


class SearchServiceProcessorTest extends TestCase {
    private MockNavplanDiContainer $config;
    private string $expectedNavaidRegexp;
    private string $expectedRpRegexp;


    private function getHttpService(): ?MockHttpService {
        $service = $this->config->getSystemServiceFactory()->getHttpService();
        return $service instanceof MockHttpService ? $service : NULL;
    }


    private function getNavaidMockRepo(): ?MockNavaidRepo {
        $mockRepo = $this->config->navaidRepo;
        return $mockRepo instanceof MockNavaidRepo ? $mockRepo : NULL;
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
        SearchServiceProcessor::processRequest($getVars, $this->config);
    }


    public function test_processRequest_searchByExtent_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_EXTENT,
            SearchByExtentQueryConverter::ARG_SEARCH_ITEMS => "navaids",
            SearchByExtentQueryConverter::ARG_MIN_LON => "7.0",
            SearchByExtentQueryConverter::ARG_MIN_LAT => "47.0",
            SearchByExtentQueryConverter::ARG_MAX_LON => "7.9",
            SearchByExtentQueryConverter::ARG_MAX_LAT => "47.9",
            SearchByExtentQueryConverter::ARG_ZOOM => "11"
        );
        SearchServiceProcessor::processRequest($getVars, $this->config);
        $this->assertRegExp($this->expectedNavaidRegexp, $this->getHttpService()->body);
    }


    public function test_processRequest_searchByPosition_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_POSITION,
            SearchByPositionQueryConverter::ARG_SEARCH_ITEMS => "navaids",
            SearchByPositionQueryConverter::ARG_LON => "7.0",
            SearchByPositionQueryConverter::ARG_LAT => "47.0",
            SearchByPositionQueryConverter::ARG_RADIUS => "10"
        );
        SearchServiceProcessor::processRequest($getVars, $this->config);
        $this->assertRegExp($this->expectedNavaidRegexp, $this->getHttpService()->body);
    }


    public function test_processRequest_searchByText_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_TEXT,
            SearchByTextQueryConverter::ARG_SEARCH_ITEMS => "navaids",
            SearchByTextQueryConverter::ARG_SEARCH_TEXT => "FRI"
        );
        SearchServiceProcessor::processRequest($getVars, $this->config);
        $this->assertRegExp($this->expectedNavaidRegexp, $this->getHttpService()->body);
    }


    public function test_processRequest_searchByIcao_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_ICAO,
            SearchByIcaoQueryConverter::ARG_SEARCH_ITEMS => "reportingpoints",
            SearchByIcaoQueryConverter::ARG_ICAO => "LSZB"
        );
        SearchServiceProcessor::processRequest($getVars, $this->config);
        $this->assertRegExp($this->expectedRpRegexp, $this->getHttpService()->body);
    }
}
