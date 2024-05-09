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
    private OgnAprsMessageParser $parser;


    protected function setUp(): void
    {
        $this->parser = new OgnAprsMessageParser();
    }


    // region APRS message parsing

    public function test_itParsesAnAprsAircraftMessage1()
    {
        // given
        $aprsMsg = 'FLRDD95E5>APRS,qAS,BOBERG:/220043h5330.69N/01009.30E\'000/000/A=000016 !W47! id06DD95E5 -019fpm +0.0rot 36.2dB 0e +0.4kHz gps3x4';

        // when
        $result = $this->parser->parse($aprsMsg);

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


    public function test_itParsesAnAprsAircraftMessage2()
    {
        // given
        $aprsMsg = 'FLRDDA5BA>APRS,qAS,LFMX:/165829h4415.41N/00600.03E\'342/049/A=005524 id0ADDA5BA -454fpm -1.1rot 8.8dB 0e +51.2kHz gps4x5';

        // when
        $result = $this->parser->parse($aprsMsg);

        // then
        $expectedAlt = new Altitude(5524, AltitudeUnit::FT, AltitudeReference::MSL);
        $expectedPos = new Position3d(6.0005, 44.25683333333333, $expectedAlt);

        $this->assertNotNull($result);
        $this->assertEquals("LFMX", $result->receiver);
        $this->assertEquals("DDA5BA", $result->address);
        $this->assertEquals("FLARM", $result->addressType);
        $this->assertEquals("TOW_PLANE", $result->acType);
        $this->assertEquals("1715273909", $result->timestamp);
        $this->assertEquals($expectedPos, $result->position);
    }


    public function test_itParsesAnAprsAircraftMessage3()
    {
        // given
        $aprsMsg = 'ZK-GSC>APRS,qAS,Omarama:/165202h4429.25S/16959.33E\'/A=001407 id05C821EA +020fpm +0.0rot 16.8dB 0e -3.1kHz gps1x3 hear1084 hearB597 hearB598';

        // when
        $result = $this->parser->parse($aprsMsg);

        // then
        $expectedAlt = new Altitude(1407, AltitudeUnit::FT, AltitudeReference::MSL);
        $expectedPos = new Position3d(169.98883333333333, -44.4875, $expectedAlt);

        $this->assertNotNull($result);
        $this->assertEquals("Omarama", $result->receiver);
        $this->assertEquals("C821EA", $result->address);
        $this->assertEquals("ICAO", $result->addressType);
        $this->assertEquals("GLIDER", $result->acType);
        $this->assertEquals("1715273522", $result->timestamp);
        $this->assertEquals($expectedPos, $result->position);
    }


    public function test_itParsesAnAprsAircraftMessageAfterVersion2_0_6()
    {
        // given
        $aprsMsg = 'ICA3ECE59>APRS,qAS,GLDRTR:/171254h5144.78N/00616.67E\'263/000/A=000075 id053ECE59';

        // when
        $result = $this->parser->parse($aprsMsg);

        // then
        $expectedAlt = new Altitude(75, AltitudeUnit::FT, AltitudeReference::MSL);
        $expectedPos = new Position3d(6.277833333333334, 51.74633333333333, $expectedAlt);

        $this->assertNotNull($result);
        $this->assertEquals("GLDRTR", $result->receiver);
        $this->assertEquals("3ECE59", $result->address);
        $this->assertEquals("ICAO", $result->addressType);
        $this->assertEquals("GLIDER", $result->acType);
        $this->assertEquals("1715274774", $result->timestamp);
        $this->assertEquals($expectedPos, $result->position);
    }


    public function test_itParsesAnAprsReceiverMessage1()
    {
        // given
        $aprsMsg = 'Prisdorf>APRS,TCPIP*,qAC,GLIDERN1:/220102h5340.77NI00945.97E&000/000/A=000075 v0.2.4.ARM CPU:0.5 RAM:771.5/972.2MB NTP:0.8ms/-7.0ppm +37.4C RF:+0.35dB';

        // when
        $result = $this->parser->parse($aprsMsg);

        // then
        $this->assertNull($result);
    }

    // endregion


    // region OGFLR message parsing

    public function test_itParsesAnOgflrAircraftMessage1()
    {
        // given
        $aprsMsg = 'FLRDD89C9>OGFLR,qAS,LIDH:/115054h4543.22N/01132.84E\'260/072/A=002542 !W10! id06DD89C9 +198fpm -0.8rot 7.0dB 0e +0.7kHz gps2x3';

        // when
        $result = $this->parser->parse($aprsMsg);

        // then
        $expectedAlt = new Altitude(2542, AltitudeUnit::FT, AltitudeReference::MSL);
        $expectedPos = new Position3d(11.547333333333333, 45.72035, $expectedAlt);

        $this->assertNotNull($result);
        $this->assertEquals("LIDH", $result->receiver);
        $this->assertEquals("DD89C9", $result->address);
        $this->assertEquals("FLARM", $result->addressType);
        $this->assertEquals("GLIDER", $result->acType);
        $this->assertEquals("1715255454", $result->timestamp);
        $this->assertEquals($expectedPos, $result->position);
    }

    // endregion


    // region OGNSKY message parsing

    public function test_itParsesAnOgnskyAircraftMessage1()
    {
        // given
        $aprsMsg = 'SKY3E5906>OGNSKY,qAS,SafeSky:/072446h5103.98N/00524.51E\'197/034/A=001250 !W45! id1C3E5906 +000fpm gps4x1';

        // when
        $result = $this->parser->parse($aprsMsg);

        // then
        $expectedAlt = new Altitude(1250, AltitudeUnit::FT, AltitudeReference::MSL);
        $expectedPos = new Position3d(5.4085833333333335, 51.0664, $expectedAlt);

        $this->assertNotNull($result);
        $this->assertEquals("SafeSky", $result->receiver);
        $this->assertEquals("3E5906", $result->address);
        $this->assertEquals("RANDOM", $result->addressType);
        $this->assertEquals("PARA_GLIDER", $result->acType);
        $this->assertEquals("1715239486", $result->timestamp);
        $this->assertEquals($expectedPos, $result->position);
    }

    // endregion


    // region OGNFNT message parsing

    public function test_itParsesAnOgnfntAircraftMessage1()
    {
        // given
        $aprsMsg = 'FNT1103CE>OGNFNT,qAS,FNB1103CE:/183727h5057.94N/00801.00Eg355/002/A=001042 !W10! id1E1103CE +03fpm';

        // when
        $result = $this->parser->parse($aprsMsg);

        // then
        $expectedAlt = new Altitude(1042, AltitudeUnit::FT, AltitudeReference::MSL);
        $expectedPos = new Position3d(8.016666666666667, 50.96568333333333, $expectedAlt);

        $this->assertNotNull($result);
        $this->assertEquals("FNB1103CE", $result->receiver);
        $this->assertEquals("1103CE", $result->address);
        $this->assertEquals("FLARM", $result->addressType);
        $this->assertEquals("PARA_GLIDER", $result->acType);
        $this->assertEquals("1715279847", $result->timestamp);
        $this->assertEquals($expectedPos, $result->position);
    }

    // endregion


    // region OGFLYM message parsing

    public function test_itParsesAnOgflymAircraftMessage1()
    {
        // given
        $aprsMsg = 'FMTF9479E>OGFLYM,qAS,FLYMASTER:/203030h4524.29N/00605.12Eg000/000/A=001535 !W59! id1CF9479E -005fpm +0.0rot';

        // when
        $result = $this->parser->parse($aprsMsg);

        // then
        $expectedAlt = new Altitude(1535, AltitudeUnit::FT, AltitudeReference::MSL);
        $expectedPos = new Position3d(6.085483333333333, 45.404916666666665, $expectedAlt);

        $this->assertNotNull($result);
        $this->assertEquals("FLYMASTER", $result->receiver);
        $this->assertEquals("F9479E", $result->address);
        $this->assertEquals("RANDOM", $result->addressType);
        $this->assertEquals("PARA_GLIDER", $result->acType);
        $this->assertEquals("1715286630", $result->timestamp);
        $this->assertEquals($expectedPos, $result->position);
    }

    // endregion
}
