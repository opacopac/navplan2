<?php declare(strict_types=1);

namespace NavplanTest\Search\Mocks;

use Navplan\Search\DomainModel\SearchResult;
use NavplanTest\Airport\Mocks\DummyAirport1;
use NavplanTest\Airport\Mocks\DummyReportingPoint1;
use NavplanTest\Airport\Mocks\DummyReportingSector1;
use NavplanTest\OpenAip\Mocks\DummyAirspace1;
use NavplanTest\OpenAip\Mocks\DummyNavaid1;
use NavplanTest\OpenAip\Mocks\DummyWebcam1;
use NavplanTest\OpenAip\Mocks\DummyWebcam2;
use NavplanTest\User\Mocks\DummyUserPoint1;
use NavplanTest\User\Mocks\DummyUserPoint2;


class DummySearchResult1 {
    public static function create(): SearchResult {
        $apList = [ DummyAirport1::create(), DummyAirport1::create() ];
        $navaidList = [ DummyNavaid1::create(), DummyNavaid1::create() ];
        $asList = [ DummyAirspace1::create(), DummyAirspace1::create() ];
        $rpList = [ DummyReportingPoint1::create(), DummyReportingSector1::create() ];
        $upList = [ DummyUserPoint1::create(), DummyUserPoint2::create() ];
        $camList = [ DummyWebcam1::create(), DummyWebcam2::create() ];
        $geoList = [];
        $notamList = [];
        $circuitList = [];

        return new SearchResult(
            $apList,
            $navaidList,
            $asList,
            $rpList,
            $upList,
            $camList,
            $geoList,
            $notamList,
            $circuitList
        );
    }
}
