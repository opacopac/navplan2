<?php declare(strict_types=1);

namespace Navplan\Geometry\Domain;


class Timestamp {
    private $valueMs;


    private function __construct(int $valueMs) {
        $this->valueMs = $valueMs;
    }


    public static function fromMs(int $valueMs): Timestamp {
        return new Timestamp($valueMs);
    }


    public static function fromS(int $valueS): Timestamp {
        return new Timestamp($valueS * 1000);
    }


    public function toMs(): int {
        return $this->valueMs;
    }


    public function toS(): int {
        return intval(ceil($this->valueMs / 1000));
    }
}
