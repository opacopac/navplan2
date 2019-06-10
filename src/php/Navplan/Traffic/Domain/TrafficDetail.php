<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain;


class TrafficDetail {
    public $icao24;
    public $registration;
    public $model;
    public $manufacturer;
    public $icaoAcType;
    public $acClass;
    public $engClass;


    public function __construct(
        ?string $icao24,
        ?string $registration,
        ?string $model,
        ?string $manufacturer,
        ?string $icaoAcType,
        ?string $acClass,
        ?string $engClass
    ) {
        $this->icao24 = $icao24 ? strtoupper($icao24) : NULL;
        $this->registration = $registration ? strtoupper($registration) : NULL;
        $this->model = $model;
        $this->manufacturer = $manufacturer;
        $this->icaoAcType = $icaoAcType ? strtoupper($icaoAcType) : NULL;
        $this->acClass = $acClass ? strtoupper($acClass) : NULL;
        $this->engClass = $engClass ? strtoupper($engClass) : NULL;
    }
}
