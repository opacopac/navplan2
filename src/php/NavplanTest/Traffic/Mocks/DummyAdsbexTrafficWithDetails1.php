<?php declare(strict_types=1);

namespace NavplanTest\Traffic\Mocks;

use Navplan\Traffic\DomainModel\TrafficAdsbexWithDetail;


class DummyAdsbexTrafficWithDetails1 {
    public static function create(): TrafficAdsbexWithDetail {
        $details = DummyIcaoAcTypeTrafficDetail1::create();

        return new TrafficAdsbexWithDetail(
            DummyAdsbexTraffic1::create(),
            $details->acClass,
            $details->engClass
        );
    }


    public static function createRest(): array {
        $details = DummyIcaoAcTypeTrafficDetail1::create();
        $rest = DummyAdsbexTraffic1::createRest();
        $rest["acclass"] = $details->acClass;
        $rest["engclass"] = $details->engClass;

        return $rest;
    }
}
