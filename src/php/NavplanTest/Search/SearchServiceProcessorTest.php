<?php declare(strict_types=1);

use Navplan\Search\SearchServiceProcessor;
use NavplanTest\DbServiceMock;
use PHPUnit\Framework\TestCase;


class SearchServiceProcessorTest extends TestCase {
    private $dbService;


    private function getDbService(): DbServiceMock {
        return $this->dbService;
    }


    protected function setUp() {
        parent::setUp();

        $this->dbService = new DbServiceMock();
    }


    public function test_processRequest_searchByText_gets_called() {
        $getVars = array("action" => "searchByText", "searchItems" => "", "searchText" => "", "token" => "");
        $this->expectException(InvalidArgumentException::class);
        SearchServiceProcessor::processRequest($getVars, $this->getDbService());
    }
}
