<?php declare(strict_types=1);

namespace NavplanTest\OpenAipRestService;

use Navplan\OpenAipRestService\OpenAipRestHelper;
use PHPUnit\Framework\TestCase;


class OpenAipRestHelperTest extends TestCase {
    public function test_reduceDegAccuracy() {
        $resultNavaid = OpenAipRestHelper::reduceDegAccuracy(1.555555555555, "NAVAID");
        $resultAirspace = OpenAipRestHelper::reduceDegAccuracy(1.555555555555, "AIRSPACE");
        $resultOther = OpenAipRestHelper::reduceDegAccuracy(1.555555555555, "XXXX");

        $this->assertEquals(1.555556, $resultNavaid);
        $this->assertEquals(1.5556, $resultAirspace);
        $this->assertEquals(1.555556, $resultOther);
    }
}
