<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain;


class TrafficDetail {
    public $address;
    public $registration;
    public $model;
    public $manufacturer;
    public $icaoAcType;
    public $acClass;
    public $engClass;


    public function __construct(
        ?TrafficAddress $address,
        ?string $registration,
        ?string $model,
        ?string $manufacturer,
        ?string $icaoAcType,
        ?string $acClass,
        ?string $engClass
    ) {
        $this->address = $address ? $address : NULL;
        $this->registration = $registration ? strtoupper($registration) : NULL;
        $this->model = $model;
        $this->manufacturer = $manufacturer;
        $this->icaoAcType = $icaoAcType ? strtoupper($icaoAcType) : NULL;
        $this->acClass = $acClass ? strtoupper($acClass) : NULL;
        $this->engClass = $engClass ? strtoupper($engClass) : NULL;
    }
}
