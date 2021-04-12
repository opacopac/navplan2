<?php declare(strict_types=1);

namespace NavplanTest\Search\RestModel;

use Navplan\Search\DomainModel\SearchItemType;
use Navplan\Search\RestModel\SearchItemTypeConverter;
use PHPUnit\Framework\TestCase;


class SearchItemTypeConverterTest extends TestCase {
    public function test_fromString() {
        $siTypes = SearchItemTypeConverter::fromString('airports,navaids');
        $this->assertEquals(2, count($siTypes));
        $this->assertEquals(SearchItemType::AIRPORTS, $siTypes[0]);
        $this->assertEquals(SearchItemType::NAVAIDS, $siTypes[1]);
    }


    public function test_getRestKeyFromType() {
        $restKey = SearchItemTypeConverter::getRestKeyFromType(SearchItemType::WEBCAMS);
        $type = SearchItemTypeConverter::getTypefromRestKey($restKey);
        $this->assertEquals(SearchItemType::WEBCAMS, $type);
    }


    public function test_getTypefromRestKey() {
        $type = SearchItemTypeConverter::getTypefromRestKey('airports');
        $restKey = SearchItemTypeConverter::getRestKeyFromType($type);
        $this->assertEquals('airports', $restKey);
    }
}
