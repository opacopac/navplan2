<?php declare(strict_types=1);

namespace Navplan\Traffic\UseCase;


interface ITrafficRepo {
    public function readDetailsFromLfrCh(array $icao24List): array;

    public function readDetailsFromBasestation(array $icao24List): array;

    public function readDetailsFromIcaoAcTypes(array $acTypeList): array;
}
