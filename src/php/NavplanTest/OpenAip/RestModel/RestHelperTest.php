<?php declare(strict_types=1);

namespace NavplanTest\OpenAipRestService;

use Navplan\OpenAip\RestModel\RestHelper;
use PHPUnit\Framework\TestCase;


class RestHelperTest extends TestCase {
    public function test_reduceDegAccuracy() {
        $resultNavaid = RestHelper::reduceDegAccuracy(1.555555555555, "NAVAID");
        $resultAirspace = RestHelper::reduceDegAccuracy(1.555555555555, "AIRSPACE");
        $resultOther = RestHelper::reduceDegAccuracy(1.555555555555, "XXXX");

        $this->assertEquals(1.555556, $resultNavaid);
        $this->assertEquals(1.5556, $resultAirspace);
        $this->assertEquals(1.555556, $resultOther);
    }
}
