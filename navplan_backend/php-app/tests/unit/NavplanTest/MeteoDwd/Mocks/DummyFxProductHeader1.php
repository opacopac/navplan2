<?php declare(strict_types=1);

namespace NavplanTest\MeteoDwd\Mocks;

use DateTime;
use Navplan\MeteoForecast\Domain\RunLengthFormat\RunLengthFormatHeader;


class DummyFxProductHeader1 {
    public static function create(): RunLengthFormatHeader {
        return new RunLengthFormatHeader(
            'FX',
            DateTime::createFromFormat('Y-m-d H:i:s', '2019-09-19 08:30:00'),
            10000,
            1620158,
            3,
            "2.12.0",
        0.1,
        5,
            [900, 900],
        110,
            00000002,
            NULL,
            "<asb,boo,ros,hnr,umd,pro,ess,fld,drs,neu,nhb,oft,eis,tur,isn,fbg,mem>",
            NULL
        );
    }


    public static function createData(): string {
        return "FX190830100000919BY1620158VS 3SW   2.12.0PR E-01INT   5GP 900x 900VV 110MF 00000002MS 69<asb,boo,ros,hnr,umd,pro,ess,fld,drs,neu,nhb,oft,eis,tur,isn,fbg,mem>";
    }
}
