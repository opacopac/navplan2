<?php declare(strict_types=1);

namespace NavplanTest\MeteoGrib2\Mocks\Section4;

use Navplan\MeteoGrib2\Domain\Section4\GeneratingProcess;


class DummyGeneratingProcess1 {
    public static function create(): GeneratingProcess {
        return new GeneratingProcess(2, 255, 255) ;
    }


    public static function createData(): string {
        return pack("CCC", 2, 255, 255);
    }
}
    
