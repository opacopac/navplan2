<?php declare(strict_types=1);

namespace NavplanTest\OpenAip\Api\Model;

use Navplan\OpenAip\Api\Model\OpenAipApiNavaidResponseConverter;
use PHPUnit\Framework\TestCase;


class OpenAipApiNavaidResponseConverterTest extends TestCase {
    public function test_fromRest() {
        $restStr = json_decode('{
            "limit": 50,
            "totalCount": 0,
            "totalPages": 1,
            "page": 1,
            "items": []
        }', true, JSON_NUMERIC_CHECK);


        $response = OpenAipApiNavaidResponseConverter::fromRest($restStr);

        $this->assertEquals(1, $response->page);
        $this->assertEquals(-1, $response->nextPage);
        $this->assertCount(0, $response->items);
    }
}
