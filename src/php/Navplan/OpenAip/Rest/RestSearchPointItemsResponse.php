<?php declare(strict_types=1);

namespace Navplan\OpenAip\Rest;

use Navplan\OpenAip\Domain\Airport;
use Navplan\OpenAip\Domain\Navaid;
use Navplan\OpenAip\Domain\ReportingPoint;
use Navplan\OpenAip\Domain\SearchPointItemsResponse;
use Navplan\OpenAip\Domain\Webcam;


class RestSearchPointItemsResponse {
    public static function toRest(SearchPointItemsResponse $response): array {
        return array(
            'airports' => array_map(function (Airport $airport) { return RestAirport::toRest($airport); }, $response->airports),
            'navaids' => array_map(function (Navaid $navaid) { return RestNavaid::toRest($navaid); }, $response->navaids),
            'reportingpoints' => array_map(function (ReportingPoint $rp) { return RestReportingPoint::toRest($rp); }, $response->reportingPoints),
            'webcams' => array_map(function (Webcam $cam) { return RestWebcam::toRest($cam); }, $response->webcams),
        );
    }
}
