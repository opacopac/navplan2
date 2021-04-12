<?php declare(strict_types=1);

namespace Navplan\OpenAip\DomainModel;

use Navplan\Geometry\DomainModel\Length;


class AirportRunway {
    public $name;
    public $surface;
    /* @var $length ?Length */
    public $length;
    /* @var $width ?Length */
    public $width;
    public $direction1;
    public $direction2;
    /* @var $tora1 ?Length */
    public $tora1;
    /* @var $tora2 ?Length */
    public $tora2;
    /* @var $lda1 ?Length */
    public $lda1;
    /* @var $lda2 ?Length */
    public $lda2;
    public $papi1;
    public $papi2;


    public function __construct(
        string $name,
        string $surface,
        ?Length $length,
        ?Length $width,
        int $direction1,
        int $direction2,
        ?Length $tora1,
        ?Length $tora2,
        ?Length $lda1,
        ?Length $lda2,
        ?bool $papi1,
        ?bool $papi2
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
