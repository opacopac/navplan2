<?php declare(strict_types=1);

namespace Navplan\OpenAip\Domain;


class AirportRunway {
    public $name;
    public $surface;
    public $length;
    public $width;
    public $direction1;
    public $direction2;
    public $tora1;
    public $tora2;
    public $lda1;
    public $lda2;
    public $papi1;
    public $papi2;


    public function __construct(
        string $name,
        string $surface,
        float $length,
        float $width,
        int $direction1,
        int $direction2,
        int $tora1,
        int $tora2,
        int $lda1,
        int $lda2,
        bool $papi1,
        bool $papi2
    ) {
        $this->name = $name;
        $this->surface = $surface;
        $this->length = $length;
        $this->width = $width;
        $this->direction1 = $direction1;
        $this->direction2 = $direction2;
        $this->tora1 = $tora1;
        $this->tora2 = $tora2;
        $this->lda1 = $lda1;
        $this->lda2 = $lda2;
        $this->papi1 = $papi1;
        $this->papi2 = $papi2;
    }
}
