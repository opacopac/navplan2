<?php declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Navplan\Traffic\ReadAdsbexTraffic;


class ReadAdsbexTrafficTest extends TestCase
{
    private $dummyArgs1;


    protected function setUp()
    {
        parent::setUp();
        $this->dummyArgs1 = array(
            "lat" => 47.0,
            "lon" => 7.0,
            "dist" => "123",
            "callback" => "callback"
        );
    }


    public function testReadTraffic()
    {
        $this->expectOutputRegex('/TODO/');

        // ReadAdsbexTraffic::readTraffic($this->dummyArgs1);
    }
}
