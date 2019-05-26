<?php declare(strict_types=1);

namespace NavplanTest\Search\Rest;

use Navplan\Search\IConfig\ISearchConfig;
use Navplan\Search\Rest\SearchByExtentQueryRest;
use Navplan\Search\Rest\SearchByIcaoQueryRest;
use Navplan\Search\Rest\SearchByPositionQueryRest;
use Navplan\Search\Rest\SearchByTextQueryRest;
use Navplan\Search\Rest\SearchServiceProcessor;
use NavplanTest\HttpResponseServiceMock;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use NavplanTest\OpenAip\Mocks\DummyReportingPoint1;
use NavplanTest\OpenAip\Mocks\NavaidRepoMock;
use NavplanTest\OpenAip\Mocks\ReportingPointRepoMock;
use NavplanTest\Search\Mocks\SearchConfigMock;
use PHPUnit\Framework\TestCase;


class SearchServiceProcessorTest extends TestCase {
    private $config;
    private $expectedNavaidRegexp;
    private $expectedRpRegexp;


    private function getConfig(): ISearchConfig {
        return $this->config;
    }


    private function getHttpService(): HttpResponseServiceMock {
        $service = $this->getConfig()->getHttpResponseService();
        return $service instanceof HttpResponseServiceMock ? $service : NULL;
    }


    private function getNavaidMockRepo(): NavaidRepoMock {
        $mockRepo = $this->getConfig()->getOpenAipRepoFactory()->createNavaidRepo();
        return $mockRepo instanceof NavaidRepoMock ? $mockRepo : NULL;
    }


    private function getRpMockRepo(): ReportingPointRepoMock {
        $mockRepo = $this->getConfig()->getOpenAipRepoFactory()->createReportingPointRepo();
        return $mockRepo instanceof ReportingPointRepoMock ? $mockRepo : NULL;
    }


    protected function setUp(): void {
        $this->config = new SearchConfigMock();

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
            SearchByExtentQueryRest::ARG_SEARCH_ITEMS => "navaids",
            SearchByExtentQueryRest::ARG_MIN_LON => "7.0",
            SearchByExtentQueryRest::ARG_MIN_LAT => "47.0",
            SearchByExtentQueryRest::ARG_MAX_LON => "7.9",
            SearchByExtentQueryRest::ARG_MAX_LAT => "47.9",
            SearchByExtentQueryRest::ARG_ZOOM => "11"
        );
        SearchServiceProcessor::processRequest($getVars, $this->getConfig());
        $this->assertRegExp($this->expectedNavaidRegexp, $this->getHttpService()->body);
    }


    public function test_processRequest_searchByPosition_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_POSITION,
            SearchByPositionQueryRest::ARG_SEARCH_ITEMS => "navaids",
            SearchByPositionQueryRest::ARG_LON => "7.0",
            SearchByPositionQueryRest::ARG_LAT => "47.0",
            SearchByPositionQueryRest::ARG_RADIUS => "10"
        );
        SearchServiceProcessor::processRequest($getVars, $this->getConfig());
        $this->assertRegExp($this->expectedNavaidRegexp, $this->getHttpService()->body);
    }


    public function test_processRequest_searchByText_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_TEXT,
            SearchByTextQueryRest::ARG_SEARCH_ITEMS => "navaids",
            SearchByTextQueryRest::ARG_SEARCH_TEXT => "FRI"
        );
        SearchServiceProcessor::processRequest($getVars, $this->getConfig());
        $this->assertRegExp($this->expectedNavaidRegexp, $this->getHttpService()->body);
    }


    public function test_processRequest_searchByIcao_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_ICAO,
            SearchByIcaoQueryRest::ARG_SEARCH_ITEMS => "reportingpoints",
            SearchByIcaoQueryRest::ARG_ICAO => "LSZB"
        );
        SearchServiceProcessor::processRequest($getVars, $this->getConfig());
        $this->assertRegExp($this->expectedRpRegexp, $this->getHttpService()->body);
    }
}
