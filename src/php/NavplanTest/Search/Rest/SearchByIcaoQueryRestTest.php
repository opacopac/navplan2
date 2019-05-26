<?php declare(strict_types=1);

namespace NavplanTest\Search\Rest;

use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\Rest\SearchByIcaoQueryRest;
use NavplanTest\Search\Mocks\SearchConfigMock;
use PHPUnit\Framework\TestCase;


class SearchByIcaoQueryRestTest extends TestCase {
    private $args;
    private $config;


    protected function setUp(): void {
        $this->config = new SearchConfigMock();
        $this->args = array(
            SearchByIcaoQueryRest::ARG_SEARCH_ITEMS => "airports,navaids",
            SearchByIcaoQueryRest::ARG_ICAO => "LSZB,LSZG,LSMP",
            SearchByIcaoQueryRest::ARG_MIN_NOTAM_TIME => "1558819678",
            SearchByIcaoQueryRest::ARG_MAX_NOTAM_TIME => "1558919678",
        );
    }


    public function testFromArray() {
        $query = SearchByIcaoQueryRest::fromArray($this->args, $this->config);
        $this->assertNotNull($query);
        $this->assertEquals([SearchItemType::AIRPORTS, SearchItemType::NAVAIDS], $query->searchItems);
        $this->assertEquals(['LSZB', 'LSZG', 'LSMP'], $query->icaoList);
        $this->assertEquals(1558819678, $query->minNotamTimestamp);
        $this->assertEquals(1558919678, $query->maxNotamTimestamp);
    }
}
