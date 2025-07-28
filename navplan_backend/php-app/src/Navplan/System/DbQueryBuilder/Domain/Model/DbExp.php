<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbExp
{
    private function __construct(
        private readonly string $value,
    )
    {
    }


    public static function fromString(string $value): DbExp
    {
        return new DbExp($value);
    }


    public function getValue(): string
    {
        return $this->value;
    }
}
