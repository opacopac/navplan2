<?php declare(strict_types=1);

namespace NavplanTest\MeteoDwd\Mocks;

use Navplan\MeteoDwd\Domain\RunLengthFormat\RunLengthFormat;
use Navplan\MeteoDwd\RunLengthFormatParser\RunLengthFormatHeaderParser;


class DummyFxProduct1 {
    public static function create(): RunLengthFormat {
        return new RunLengthFormat(
            DummyFxProductHeader1::create(),
            DummyFxProductValues1::create()
        );
    }


    public static function createData(): string {
        return
            DummyFxProductHeader1::createData()
            . pack('C', RunLengthFormatHeaderParser::END_HEADER)
            . DummyFxProductValues1::createData();
    }
}
