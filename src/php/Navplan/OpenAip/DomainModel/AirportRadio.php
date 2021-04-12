<?php declare(strict_types=1);

namespace Navplan\OpenAip\DomainModel;


class AirportRadio {
    public $category;
    public $frequency;
    public $type;
    public $typespec;
    public $description;


    public function __construct(
        string $category,
        string $frequency,
        string $type,
        ?string $typespec,
        string $description
    ) {
        $this->category = $category;
        $this->frequency = $frequency;
        $this->type = $type;
        $this->typespec = $typespec;
        $this->description = $description;
    }
}
