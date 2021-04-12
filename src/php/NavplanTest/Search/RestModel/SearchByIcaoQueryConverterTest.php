<?php declare(strict_types=1);

namespace NavplanTest\Search\RestModel;

use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\RestModel\SearchByIcaoQueryConverter;
use PHPUnit\Framework\TestCase;


class SearchByIcaoQueryConverterTest extends TestCase {
    private array $args;


    protected function setUp(): void {
        $this->args = array(
            SearchByIcaoQueryConverter::ARG_SEARCH_ITEMS => "airports,navaids",
            SearchByIcaoQueryConverter::ARG_ICAO => "LSZB,LSZG,LSMP",
            SearchByIcaoQueryConverter::ARG_MIN_NOTAM_TIME => "1558819678",
            SearchByIcaoQueryConverter::ARG_MAX_NOTAM_TIME => "1558919678",
        );
    }


    public function testFromArray() {
        $query = SearchByIcaoQueryConverter::fromArgs($this->args);
        $this->assertNotNull($query);
        $this->assertEquals([SearchItemType::AIRPORTS, SearchItemType::NAVAIDS], $query->searchItems);
        $this->assertEquals(['LSZB', 'LSZG', 'LSMP'], $query->icaoList);
        $this->assertEquals(1558819678, $query->minNotamTimestamp);
        $this->assertEquals(1558919678, $query->maxNotamTimestamp);
    }
}
