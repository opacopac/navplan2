<?php declare(strict_types=1);

namespace NavplanTest\Common\DomainModel;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Position3d;
use PHPUnit\Framework\TestCase;


class Position3dTest extends TestCase {
    public function test__construct() {
        $alt = Altitude::fromFtAmsl(1500);

        $pos = new Position3d(7.0, 47.0, $alt);

        $this->assertNotNull($pos);
        $this->assertEquals(7.0, $pos->longitude);
        $this->assertEquals(47.0, $pos->latitude);
        $this->assertEquals($alt, $pos->altitude);
    }
}
