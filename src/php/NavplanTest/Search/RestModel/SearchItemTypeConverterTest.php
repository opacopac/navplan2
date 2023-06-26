<?php declare(strict_types=1);

namespace NavplanTest\Search\RestModel;

use Navplan\Search\Domain\Model\SearchItemType;
use Navplan\Search\Rest\Model\RestSearchItemTypeConverter;
use PHPUnit\Framework\TestCase;


class SearchItemTypeConverterTest extends TestCase {
    public function test_fromString() {
        $siTypes = RestSearchItemTypeConverter::fromString('airports,navaids');
        $this->assertEquals(2, count($siTypes));
        $this->assertEquals(SearchItemType::AIRPORTS, $siTypes[0]);
        $this->assertEquals(SearchItemType::NAVAIDS, $siTypes[1]);
    }


    public function test_getRestKeyFromType() {
        $restKey = RestSearchItemTypeConverter::getRestKeyFromType(SearchItemType::WEBCAMS);
        $type = RestSearchItemTypeConverter::getTypefromRestKey($restKey);
        $this->assertEquals(SearchItemType::WEBCAMS, $type);
    }


    public function test_getTypefromRestKey() {
        $type = RestSearchItemTypeConverter::getTypefromRestKey('airports');
        $restKey = RestSearchItemTypeConverter::getRestKeyFromType($type);
        $this->assertEquals('airports', $restKey);
    }
}
