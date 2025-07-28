<?php declare(strict_types=1);

namespace Navplan\Common\Domain\Model;


class Frequency
{
    public function __construct(
        public float $value,
        public FrequencyUnit $unit,
    )
    {
    }


    public static function fromMhz(float $value): Frequency
    {
        return new Frequency($value, FrequencyUnit::MHZ);
    }


    public static function fromKhz(float $value): Frequency
    {
        return new Frequency($value, FrequencyUnit::KHZ);
    }
}
