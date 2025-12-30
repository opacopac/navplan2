<?php declare(strict_types=1);

namespace NavplanTest\Notam\IcaoImporter;

use Navplan\Common\Domain\Model\Altitude;
use Navplan\Common\Domain\Model\Length;
use Navplan\Common\GeoHelper;
use Navplan\Notam\IcaoImporter\IcaoApiNotamQLine;
use PHPUnit\Framework\TestCase;


class IcaoApiNotamQLineTest extends TestCase
{
    const string QLINE_TEXT1 = "LFEE/QWULW/IV/BO /W /000/020/4729N00725E005";
    const string QLINE_TEXT2 = "FCXX/QKKKK/K/K/K/000/999/0626N01361E999";

    public function test_it_parses_the_q_line_from_the_notam_text()
    {
        // given
        $notam_text = self::QLINE_TEXT1;

        // when
        $result = IcaoApiNotamQLine::tryParse($notam_text);

        // then
        $this->assertNotNull($result);
        $this->assertEquals("LFEE", $result->firCode);
        $this->assertEquals("QWULW", $result->notamCode);
        $this->assertEquals("IV", $result->traffic);
        $this->assertEquals("BO", $result->purpose);
        $this->assertEquals("W", $result->scope);
        $this->assertEquals(Altitude::fromFl(0), $result->lowerLimit);
        $this->assertEquals(Altitude::fromFl(20), $result->upperLimit);
        $this->assertEqualsWithDelta(GeoHelper::getDecFromDms("N", 47, 29, 0), $result->coordinates->latitude, 0.00001);
        $this->assertEqualsWithDelta(GeoHelper::getDecFromDms("E", 7, 25, 0), $result->coordinates->longitude, 0.00001);
        $this->assertEquals(Length::fromNm(5), $result->radius);
    }


    public function test_it_parses_another_q_line_from_the_notam_text()
    {
        // given
        $notam_text = self::QLINE_TEXT2;

        // when
        $result = IcaoApiNotamQLine::tryParse($notam_text);

        // then
        $this->assertNotNull($result);
        $this->assertEquals("FCXX", $result->firCode);
        $this->assertEquals("QKKKK", $result->notamCode);
        $this->assertEquals("K", $result->traffic);
        $this->assertEquals("K", $result->purpose);
        $this->assertEquals("K", $result->scope);
        $this->assertEquals(Altitude::fromFl(0), $result->lowerLimit);
        $this->assertEquals(Altitude::fromFl(999), $result->upperLimit);
        $this->assertEqualsWithDelta(GeoHelper::getDecFromDms("N", 6, 26, 0), $result->coordinates->latitude, 0.00001);
        $this->assertEqualsWithDelta(GeoHelper::getDecFromDms("E", 13, 61, 0) , $result->coordinates->longitude, 0.00001);
        $this->assertEquals(Length::fromNm(999), $result->radius);
    }


    public function test_it_returns_null_if_q_line_is_invalid()
    {
        // given
        $notam_text = "INVALID/QLINE/TEXT";

        // when
        $result = IcaoApiNotamQLine::tryParse($notam_text);

        // then
        $this->assertNull($result);
    }
}
