<?php declare(strict_types=1);

namespace Navplan\System\DbQueryBuilder\Domain\Model;


class DbCol
{
    public function __construct(
        private readonly DbTable $table,
        private readonly string $name,
        private readonly DbColType $type,
        private readonly bool $isNullable = false,
    )
    {
    }


    public function getTable(): DbTable
    {
        return $this->table;
    }


    public function getName(): string
    {
        return $this->name;
    }


    public function getType(): DbColType
    {
        return $this->type;
    }


    public function isNullable(): bool
    {
        return $this->isNullable;
    }
}
