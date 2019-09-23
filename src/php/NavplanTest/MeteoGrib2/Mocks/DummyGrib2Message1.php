<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks;

use Navplan\MeteoGrib2\Domain\Grib2Message;
use Navplan\MeteoGrib2\Grib2Parser\Grib2MessageParser;
use Navplan\MeteoGrib2\Grib2Parser\Section0\Section0Parser;
use Navplan\MeteoGrib2\Grib2Parser\Section8\Section8Parser;
use NavplanTest\MeteoGrib2\Mocks\Section0\DummySection0_1;
use NavplanTest\MeteoGrib2\Mocks\Section1\DummySection1_1;
use NavplanTest\MeteoGrib2\Mocks\Section2\DummySection2_1;
use NavplanTest\MeteoGrib2\Mocks\Section3\DummySection3_1;
use NavplanTest\MeteoGrib2\Mocks\Section4\DummySection4_1;
use NavplanTest\MeteoGrib2\Mocks\Section5\DummySection5_1;
use NavplanTest\MeteoGrib2\Mocks\Section6\DummySection6_1;
use NavplanTest\MeteoGrib2\Mocks\Section7\DummySection7_1;
use NavplanTest\MeteoGrib2\Mocks\Section8\DummySection8_1;


class DummyGrib2Message1 {
    public static function create(): Grib2Message {
        $message = new Grib2Message();
        $message->addSection0(DummySection0_1::create());
        $message->addSection1(DummySection1_1::create());
        $message->addSection2(DummySection2_1::create());
        $message->addSection3(DummySection3_1::create());
        $message->addSection4(DummySection4_1::create());
        $message->addSection5(DummySection5_1::create());
        $message->addSection6(DummySection6_1::create());
        $message->addSection7(DummySection7_1::create());
        $message->addSection8(DummySection8_1::create());

        return $message;
    }



    public static function createData(): string {
        return self::addHeader(DummySection0_1::createData(), 0)
            . self::addHeader(DummySection1_1::createData(), 1)
            . self::addHeader(DummySection2_1::createData(), 2)
            . self::addHeader(DummySection3_1::createData(), 3)
            . self::addHeader(DummySection4_1::createData(), 4)
            . self::addHeader(DummySection5_1::createData(), 5)
            . self::addHeader(DummySection6_1::createData(), 6)
            . self::addHeader(DummySection7_1::createData(), 7)
            . self::addHeader(DummySection8_1::createData(), 8);
    }


    private static function addHeader(string $data, int $sectionNr): string {
        if ($sectionNr === 0) {
            return pack("a4",Section0Parser::GRIB2_MAGIC) . $data;
        } else if ($sectionNr === 8) {
            return pack("a4",Section8Parser::GRIB2_FINAL_MAGIC);
        } else {
            return pack("NC",
                    strlen($data) + Grib2MessageParser::MAGIC_LENGTH_BYTES + Grib2MessageParser::SECTION_NR_BYTES,
                    $sectionNr
                ) . $data;
        }
    }
}
