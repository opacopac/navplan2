<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Ogn\Service;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\AltitudeReference;
use Navplan\Common\Domain\Model\AltitudeUnit;
use Navplan\Common\Domain\Model\Position3d;
use Navplan\Traffic\Ogn\Model\OgnAprsMessageParser;
use PHPUnit\Framework\TestCase;


class OgnAprsMessageParserTest extends TestCase
{
    protected function setUp(): void
    {
    }

    // Prisdorf>APRS,TCPIP*,qAC,GLIDERN1:/220102h5340.77NI00945.97E&000/000/A=000075 v0.2.4.ARM CPU:0.5 RAM:771.5/972.2MB NTP:0.8ms/-7.0ppm +37.4C RF:+0.35dB
    // FLRDD95E5>APRS,qAS,BOBERG:/220043h5330.69N/01009.30E'000/000/A=000016 !W47! id06DD95E5 -019fpm +0.0rot 36.2dB 0e +0.4kHz gps3x4

    public function test_itParsesAnAprsMessage1()
    {
        // given
        $aprsMsg = 'FLRDD95E5>APRS,qAS,BOBERG:/220043h5330.69N/01009.30E\'000/000/A=000016 !W47! id06DD95E5 -019fpm +0.0rot 36.2dB 0e +0.4kHz gps3x4';
        $parser = new OgnAprsMessageParser();

        // when
        $result = $parser->parse($aprsMsg);

        // then
        $expectedAlt = new Altitude(16, AltitudeUnit::FT, AltitudeReference::MSL);
        $expectedPos = new Position3d(10.155116666666666, 53.51156666666667, $expectedAlt);

        $this->assertNotNull($result);
        $this->assertEquals("BOBERG", $result->receiver);
        $this->assertEquals("DD95E5", $result->address);
        $this->assertEquals("FLARM", $result->addressType);
        $this->assertEquals("GLIDER", $result->acType);
        $this->assertEquals("1715292043", $result->timestamp);
        $this->assertEquals($expectedPos, $result->position);
    }
}
