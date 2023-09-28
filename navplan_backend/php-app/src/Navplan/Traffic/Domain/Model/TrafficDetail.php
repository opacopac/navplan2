<?php declare(strict_types=1);

namespace Navplan\Traffic\Domain\Model;


class TrafficDetail {
    public function __construct(
        public ?TrafficAddress $address,
        public ?string $registration,
        public ?string $model,
        public ?string $manufacturer,
        public ?string $icaoAcType,
        public ?string $acClass,
        public ?string $engClass
    ) {
        $this->address = $address ?: NULL;
        $this->registration = $registration ? strtoupper($registration) : NULL;
        $this->icaoAcType = $icaoAcType ? strtoupper($icaoAcType) : NULL;
        $this->acClass = $acClass ? strtoupper($acClass) : NULL;
        $this->engClass = $engClass ? strtoupper($engClass) : NULL;
    }
}
