<?php declare(strict_types=1);

namespace Navplan\Search\Rest;

use Navplan\Notam\Domain\Notam;
use Navplan\Notam\Rest\RestNotam;
use Navplan\OpenAip\Domain\Airport;
use Navplan\OpenAip\Domain\Airspace;
use Navplan\OpenAip\Domain\Navaid;
use Navplan\OpenAip\Domain\ReportingPoint;
use Navplan\OpenAip\Domain\Webcam;
use Navplan\OpenAip\Rest\RestAirport;
use Navplan\OpenAip\Rest\RestAirspace;
use Navplan\OpenAip\Rest\RestNavaid;
use Navplan\OpenAip\Rest\RestReportingPoint;
use Navplan\OpenAip\Rest\RestWebcam;
use Navplan\Search\Domain\SearchResult;
use Navplan\User\Domain\UserPoint;
use Navplan\User\Rest\RestUserPoint;


class RestSearchResult {
    public static function toRest(
        SearchResult $result
    ): array {
        return array(
            'airports' => array_map(function (Airport $airport) { return RestAirport::toRest($airport); }, $result->airports),
            'navaids' => array_map(function (Navaid $navaid) { return RestNavaid::toRest($navaid); }, $result->navaids),
            'airspaces' => array_map(function (Airspace $as) { return RestAirspace::toRest($as); }, $result->airspaces),
            'reportingpoints' => array_map(function (ReportingPoint $rp) { return RestReportingPoint::toRest($rp); }, $result->reportingPoints),
            'userpoints' => array_map(function (UserPoint $up) { return RestUserPoint::toArray($up); }, $result->userPoints),
            'webcams' => array_map(function (Webcam $cam) { return RestWebcam::toRest($cam); }, $result->webcams),
            'geonames' => [],
            'notams' => array_map(function (Notam $notam) { return RestNotam::toRest($notam); }, $result->notams)
        );
    }
}
