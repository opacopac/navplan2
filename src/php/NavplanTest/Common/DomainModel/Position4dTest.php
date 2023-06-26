<?php declare(strict_types=1);

namespace NavplanTest\Common\DomainModel;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Position4d;
use Navplan\Common\Domain\Model\Timestamp;
use PHPUnit\Framework\TestCase;


class Position4dTest extends TestCase {
    public function test__construct() {
        $alt = Altitude::fromFtAmsl(1500);
        $timestamp = Timestamp::fromMs(1560000429704);

        $pos = new Position4d(7.0, 47.0, $alt, $timestamp);

        $this->assertNotNull($pos);
        $this->assertEquals(7.0, $pos->longitude);
        $this->assertEquals(47.0, $pos->latitude);
        $this->assertEquals($alt, $pos->altitude);
        $this->assertEquals($timestamp, $pos->timestamp);
    }
}
