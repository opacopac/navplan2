<?php declare(strict_types=1);

namespace Navplan\OpenAip\DbModel;


class DbAirportChartConverter {
    public function fromDbResult(array $rs): array {
        return array(
            "id" => $rs["id"],
            "source" => $rs["source"],
            "type" => $rs["type"],
            "filename" => $rs["filename"],
            "mercator_n" => $rs["mercator_n"], // TODO
            "mercator_s" => $rs["mercator_s"],
            "mercator_e" => $rs["mercator_e"],
            "mercator_w" => $rs["mercator_w"]
        );
    }
}
