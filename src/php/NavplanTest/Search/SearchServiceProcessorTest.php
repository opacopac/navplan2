<?php declare(strict_types=1);

namespace NavplanTest\Search;

use Navplan\Search\SearchServiceProcessor;
use Navplan\Search\UseCase\ISearchConfig;
use Navplan\Search\Rest\RestSearchByExtentQuery;
use Navplan\Search\Rest\RestSearchByIcaoQuery;
use Navplan\Search\Rest\RestSearchByPositionQuery;
use Navplan\Search\Rest\RestSearchByTextQuery;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use NavplanTest\OpenAip\Mocks\MockNavaidRepo;
use NavplanTest\OpenAip\Mocks\MockReportingPointRepo;
use NavplanTest\Search\Mocks\MockSearchConfig;
use NavplanTest\System\Mock\MockHttpResponseService;
use PHPUnit\Framework\TestCase;


class SearchServiceProcessorTest extends TestCase {
    private $config;
    private $expectedNavaidRegexp;
    private $expectedRpRegexp;


    private function getConfig(): ISearchConfig {
        return $this->config;
    }


    private function getHttpService(): MockHttpResponseService {
        $service = $this->getConfig()->getHttpResponseService();
        return $service instanceof MockHttpResponseService ? $service : NULL;
    }


    private function getNavaidMockRepo(): MockNavaidRepo {
        $mockRepo = $this->getConfig()->getOpenAipRepoFactory()->createNavaidRepo();
        return $mockRepo instanceof MockNavaidRepo ? $mockRepo : NULL;
    }


    private function getRpMockRepo(): MockReportingPointRepo {
        $mockRepo = $this->getConfig()->getOpenAipRepoFactory()->createReportingPointRepo();
        return $mockRepo instanceof MockReportingPointRepo ? $mockRepo : NULL;
    }


    protected function setUp(): void {
        $this->config = new MockSearchConfig();

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
        $this->expectException("InvalidArgumentException");
        SearchServiceProcessor::processRequest($getVars, $this->getConfig());
    }


    public function test_processRequest_searchByExtent_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_EXTENT,
            RestSearchByExtentQuery::ARG_SEARCH_ITEMS => "navaids",
            RestSearchByExtentQuery::ARG_MIN_LON => "7.0",
            RestSearchByExtentQuery::ARG_MIN_LAT => "47.0",
            RestSearchByExtentQuery::ARG_MAX_LON => "7.9",
            RestSearchByExtentQuery::ARG_MAX_LAT => "47.9",
            RestSearchByExtentQuery::ARG_ZOOM => "11"
        );
        SearchServiceProcessor::processRequest($getVars, $this->getConfig());
        $this->assertRegExp($this->expectedNavaidRegexp, $this->getHttpService()->body);
    }


    public function test_processRequest_searchByPosition_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_POSITION,
            RestSearchByPositionQuery::ARG_SEARCH_ITEMS => "navaids",
            RestSearchByPositionQuery::ARG_LON => "7.0",
            RestSearchByPositionQuery::ARG_LAT => "47.0",
            RestSearchByPositionQuery::ARG_RADIUS => "10"
        );
        SearchServiceProcessor::processRequest($getVars, $this->getConfig());
        $this->assertRegExp($this->expectedNavaidRegexp, $this->getHttpService()->body);
    }


    public function test_processRequest_searchByText_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_TEXT,
            RestSearchByTextQuery::ARG_SEARCH_ITEMS => "navaids",
            RestSearchByTextQuery::ARG_SEARCH_TEXT => "FRI"
        );
        SearchServiceProcessor::processRequest($getVars, $this->getConfig());
        $this->assertRegExp($this->expectedNavaidRegexp, $this->getHttpService()->body);
    }


    public function test_processRequest_searchByIcao_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_ICAO,
            RestSearchByIcaoQuery::ARG_SEARCH_ITEMS => "reportingpoints",
            RestSearchByIcaoQuery::ARG_ICAO => "LSZB"
        );
        SearchServiceProcessor::processRequest($getVars, $this->getConfig());
        $this->assertRegExp($this->expectedRpRegexp, $this->getHttpService()->body);
    }
}
