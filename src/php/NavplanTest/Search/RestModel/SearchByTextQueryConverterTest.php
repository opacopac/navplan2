<?php declare(strict_types=1);

namespace NavplanTest\Search\RestModel;

use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\RestModel\SearchByTextQueryConverter;
use PHPUnit\Framework\TestCase;


class SearchByTextQueryConverterTest extends TestCase {
    private array $args;


    protected function setUp(): void {
        $this->args = array(
            SearchByTextQueryConverter::ARG_SEARCH_ITEMS => "airports,navaids",
            SearchByTextQueryConverter::ARG_SEARCH_TEXT => "LSZB",
            SearchByTextQueryConverter::ARG_TOKEN => NULL, // TODO
        );
    }


    public function test_FromArray() {
        $query = SearchByTextQueryConverter::fromArgs($this->args);
        $this->assertNotNull($query);
        $this->assertEquals([SearchItemType::AIRPORTS, SearchItemType::NAVAIDS], $query->searchItems);
        $this->assertEquals("LSZB", $query->searchText);
        $this->assertEquals(NULL, $query->token);
    }
}
