<?php declare(strict_types=1);

use Navplan\Search\SearchItem;
use Navplan\Search\SearchServiceProcessor;
use Navplan\Search\SearchByText;
use Navplan\Search\SearchByPosition;
use Navplan\Search\SearchByExtent;
use Navplan\Search\SearchByIcao;
use NavplanTest\DbServiceMock;
use NavplanTest\HttpResponseServiceMock;
use PHPUnit\Framework\TestCase;


class SearchServiceProcessorTest extends TestCase {
    private $httpService;
    private $dbService;


    private function getHttpService(): HttpResponseServiceMock {
        return $this->httpService;
    }


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    private function getNavaidResultMock(string $kuerzel): array {
        return [array(
            "id" => "123",
            "type" => "navaid",
            "kuerzel" => $kuerzel,
            "name" => "Fribourg VOR-DME",
            "latitude" => 47.7,
            "longitude" => 7.7,
            "elevation" => 500,
            "frequency" => 123.456,
            "unit" => "MHz",
            "declination" => 2.0,
            "truenorth" => true
        )];
    }


    private function getRepPointResultMock(string $name): array {
        return [array(
            "id" => "123",
            "type" => "reportingpoint",
            "airport_icao" => "LSZB",
            "name" => $name,
            "heli" => false,
            "inbd_comp" => true,
            "outbd_comp" => true,
            "min_ft" => 3500,
            "max_ft" => 4500,
            "latitude" => 47.7,
            "longitude" => 7.7,
            "polygon" => ""
        )];
    }


    protected function setUp() {
        parent::setUp();

        $this->httpService = new HttpResponseServiceMock();
        $this->dbService = new DbServiceMock();
    }


    public function test_no_action_throws_error() {
        $getVars = array(
            "dummy" => "dummy"
        );
        $this->expectException("InvalidArgumentException");
        SearchServiceProcessor::processRequest($getVars, $this->getDbService(), $this->getHttpService());
    }


    public function test_processRequest_searchByText_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_TEXT,
            SearchByText::ARG_SEARCH_ITEMS => SearchItem::NAVAIDS,
            SearchByText::ARG_SEARCH_TEXT => "FRI"
        );
        $this->expectOutputRegex('/(.*)"kuerzel":"FRI1"/');
        $this->getDbService()->pushMockResult($this->getNavaidResultMock("FRI1"));
        SearchServiceProcessor::processRequest($getVars, $this->getDbService(), $this->getHttpService());

        //var_dump($this->getHttpService());

        //$this->assertRegExp('/(.*)"kuerzel":"FRI1"/', $this->getHttpService()->payloadList[0]);
    }


    public function test_processRequest_searchByPosition_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_POSITION,
            SearchByPosition::ARG_SEARCH_ITEMS => SearchItem::NAVAIDS,
            SearchByPosition::ARG_LON => "7.0",
            SearchByPosition::ARG_LAT => "47.0",
            SearchByPosition::ARG_RADIUS => "10"
        );
        $this->expectOutputRegex('/(.*)"kuerzel":"FRI2"/');
        $this->getDbService()->pushMockResult($this->getNavaidResultMock("FRI2"));
        SearchServiceProcessor::processRequest($getVars, $this->getDbService(), $this->getHttpService());
    }


    public function test_processRequest_searchByExtent_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_EXTENT,
            SearchByExtent::ARG_SEARCH_ITEMS => SearchItem::NAVAIDS,
            SearchByExtent::ARG_MIN_LON => "7.0",
            SearchByExtent::ARG_MIN_LAT => "47.0",
            SearchByExtent::ARG_MAX_LON => "47.1",
            SearchByExtent::ARG_MAX_LAT => "7.1",
            SearchByExtent::ARG_ZOOM => "11"
        );
        $this->expectOutputRegex('/(.*)"kuerzel":"FRI3"/');
        $this->getDbService()->pushMockResult($this->getNavaidResultMock("FRI3"));
        SearchServiceProcessor::processRequest($getVars, $this->getDbService(), $this->getHttpService());
    }


    public function test_processRequest_searchByIcao_gets_called() {
        $getVars = array(
            SearchServiceProcessor::ARG_ACTION => SearchServiceProcessor::ACTION_SEARCH_BY_ICAO,
            SearchByIcao::ARG_SEARCH_ITEMS => SearchItem::REPORTINGPOINTS,
            SearchByIcao::ARG_ICAO => "LSZB"
        );
        //TODO
        //$this->expectOutputRegex('/(.*)"name":"W"/');
        $this->expectException("BadMethodCallException");
        $this->getDbService()->pushMockResult($this->getRepPointResultMock("W"));
        SearchServiceProcessor::processRequest($getVars, $this->getDbService(), $this->getHttpService());
    }
}
