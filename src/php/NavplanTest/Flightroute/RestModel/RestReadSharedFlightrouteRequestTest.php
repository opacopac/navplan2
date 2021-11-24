<?php declare(strict_types=1);

namespace NavplanTest\Flightroute\RestModel;

use Navplan\Flightroute\RestModel\RestReadSharedFlightrouteRequestConverter;
use PHPUnit\Framework\TestCase;


class RestReadSharedFlightrouteRequestTest extends TestCase {
    public function test_fromArgs() {
        $shareId = "7hkt0g8pyq";;
        $args = array("shareid" => $shareId);
        $request = RestReadSharedFlightrouteRequestConverter::fromArgs($args);

        $this->assertNotNull($request);
        $this->assertEquals($shareId, $request->shareId);
    }
}
