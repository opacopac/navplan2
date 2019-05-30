<?php declare(strict_types=1);

namespace NavplanTest\Search\Rest;

use Navplan\Search\Domain\SearchItemType;
use Navplan\Search\Rest\RestSearchByIcaoQuery;
use PHPUnit\Framework\TestCase;


class SearchByIcaoQueryRestTest extends TestCase {
    private $args;


    protected function setUp(): void {
        $this->args = array(
            RestSearchByIcaoQuery::ARG_SEARCH_ITEMS => "airports,navaids",
            RestSearchByIcaoQuery::ARG_ICAO => "LSZB,LSZG,LSMP",
            RestSearchByIcaoQuery::ARG_MIN_NOTAM_TIME => "1558819678",
            RestSearchByIcaoQuery::ARG_MAX_NOTAM_TIME => "1558919678",
        );
    }


    public function testFromArray() {
        $query = RestSearchByIcaoQuery::fromArray($this->args);
        $this->assertNotNull($query);
        $this->assertEquals([SearchItemType::AIRPORTS, SearchItemType::NAVAIDS], $query->searchItems);
        $this->assertEquals(['LSZB', 'LSZG', 'LSMP'], $query->icaoList);
        $this->assertEquals(1558819678, $query->minNotamTimestamp);
        $this->assertEquals(1558919678, $query->maxNotamTimestamp);
    }
}
